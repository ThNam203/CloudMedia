const jwt = require('jsonwebtoken')
const s3Controller = require('./s3Controller')

const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const User = require('../models/User')
const Story = require('../models/Story')
const JWTBlacklist = require('../models/JWTBlacklist')
const socketIO = require('../socket/socket')
const Notification = require('../models/Notification')

const getUserIdFromJWT = async (req, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')
    )
        return next(new AppError('Missing authorization header', 401))

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return next(new AppError('Missing JWT token', 401))

    const freshToken = await JWTBlacklist.findOne({ jwtData: token })
    if (freshToken)
        return next(
            new AppError('Invalid request, this token is already revoked', 401)
        )

    jwt.verify(token, process.env.JWT_SECRET)
    const data = jwt.decode(token)
    return data.id
}

const sendNotificationOnPostingStory = async (storyId, storyAuthor) => {
    storyAuthor.followers.forEach(async (followerId) => {
        const noti = await Notification.create({
            userId: followerId.toString(),
            sender: storyAuthor._id,
            notificationType: 'NewStory', // todo: there is no time for other type, should be changed in future
            content: `${storyAuthor.name} has posted a new story`,
            isRead: false,
            link: storyId,
        })

        const notiObject = noti.toObject()
        notiObject.sender = {
            _id: storyAuthor._id,
            name: storyAuthor.name,
            profileImagePath: storyAuthor.profileImagePath,
        }

        const io = socketIO.getIO()
        if (noti) io.in(followerId.toString()).emit('newNotification', notiObject)
    })
}

exports.createNewStory = asyncCatch(async (req, res, next) => {
    const { userId } = req.params

    const mediaFiles = []
    if (req.files) {
        req.files.forEach((file) => {
            let fileType
            if (file.mimetype.startsWith('image/')) fileType = 'Image'
            else if (file.mimetype.startsWith('video/')) fileType = 'Video'

            const newFile = {
                location: file.location,
                name: file.originalname,
                fileType: fileType,
            }

            mediaFiles.push(newFile)
        })
    }

    const newStory = await Story.create({
        author: userId,
        mediaFiles: mediaFiles,
    })

    if (!newStory) {
        if (req.files)
            req.files.forEach((item) =>
                s3Controller.deleteMediaFile(item.location)
            )
        return next(new AppError('Unable to create new story', 500))
    }

    const populatedStory = await newStory.populate(
        'author',
        '_id name profileImagePath followers'
    )

    sendNotificationOnPostingStory(populatedStory._id, populatedStory.author)

    res.status(200).json(populatedStory)
})

exports.getStoryById = asyncCatch(async (req, res, next) => {
    const { storyId } = req.params
    const story = await Story.findById(storyId).populate(
        'author',
        '_id name profileImagePath workingPlace'
    )

    if (!story)
        return next(
            new AppError(`Unable to find the story or invalid  story's id`, 500)
        )

    // userId is the current request user, the author is post's owner
    const userId = await getUserIdFromJWT(req, next)
    const isLiked = story.likedUsers.includes(userId)
    const storyObject = story.toObject()
    storyObject.isLiked = isLiked
    delete storyObject.likedUsers

    res.status(200).json(storyObject)
})

exports.getAllStoryOfAUser = asyncCatch(async (req, res, next) => {
    const { userId: authorId } = req.params
    const author = await User.findById(authorId)
    if (!author) return next(new AppError('Unable to find this user', 404))
    const storiesRaw = await Story.find({
        author: authorId,
    }).populate('author', '_id name profileImagePath workingPlace')

    // userId is the current request user, the author is post's owner
    const userId = await getUserIdFromJWT(req, next)
    const stories = storiesRaw.map((story) => {
        const isLiked = story.likedUsers.includes(userId)
        const postObject = story.toObject()
        postObject.isLiked = isLiked
        delete postObject.likedUsers
        return postObject
    })

    res.status(200).json(stories)
})

exports.toggleLikeStory = asyncCatch(async (req, res, next) => {
    const { storyId } = req.params
    const userId = await getUserIdFromJWT(req, next)

    const story = await Story.findById(storyId)
    if (!story) return next(new AppError('Unable to find the story', 500))

    const indexOfTheLiked = story.likedUsers.indexOf(userId)
    if (indexOfTheLiked === -1) {
        story.likedUsers.push(userId)
        story.likeCount += 1
    } else {
        story.likedUsers.splice(indexOfTheLiked, 1)
        story.likeCount -= 1
    }

    story.markModified('likedUsers')
    await story.save()

    res.status(204).end()
})

exports.deleteStory = asyncCatch(async (req, res, next) => {
    const { storyId } = req.params

    const deletedStory = await Story.findByIdAndDelete(storyId)
    if (!deletedStory)
        return next(new AppError('Invalid story or already removed', 400))

    deletedStory.mediaFiles.forEach((mediaFile) =>
        s3Controller.deleteMediaFile(mediaFile.location)
    )

    res.status(204).end()
})

exports.storyFeed = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    const storyFeed = await Story.find({
        author: userId,
    })
        .sort({ createdAt: -1 })
        .limit(1)
        .populate('author', '_id name profileImagePath workingPlace')

    const followerFeed = await Story.find({ author: { $in: user.followings } })
        .sort({ createdAt: -1 }) // Sort by descending createdAt
        .limit(14)
        .populate('author', '_id name profileImagePath workingPlace')

    const numberLeft = 14 - followerFeed.length
    if (numberLeft === 0)
        return res.status(200).json([...storyFeed, ...followerFeed])

    const randomStories = await Story.find({
        $and: [
            { author: { $nin: [...user.followings, user._id] } },
            { _id: { $nin: followerFeed.map((feed) => feed._id) } },
        ],
    })
        .sort({ likeCount: -1 })
        .limit(numberLeft)
        .populate('author', '_id name profileImagePath workingPlace')

    res.status(200).json([...storyFeed, ...followerFeed, ...randomStories])
})
