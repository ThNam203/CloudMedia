const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const uuid = require('uuid')
const multerS3 = require('multer-s3')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const User = require('../models/User')
const StatusPost = require('../models/StatusPost')

const s3Client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

exports.uploadMediaFiles = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'workwise',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, uuid.v4())
        },
    }),
})

const deleteMediaFile = (path) => {
    const command = new DeleteObjectCommand({
        Bucket: 'workwise',
        Key: path.substring(path.lastIndexOf('/') + 1, path.length),
    })

    s3Client.send(command).catch(() => {})
}

exports.getStatusPostById = asyncCatch(async (req, res, next) => {
    const { statusPostId } = req.params
    const statusPost = await StatusPost.findById(statusPostId)

    if (!statusPost)
        return next(
            new AppError(
                `Unable to find the status post or invalid status post's id`,
                500
            )
        )

    res.status(200).json(statusPost)
})

exports.createNewStatusPost = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    // req.body.author = userId
    req.body.mediaFiles = []

    const newStatusPost = await StatusPost.create({
        author: userId,
        description: req.body.description,
        mediaFiles: [],
    })

    if (!newStatusPost) {
        next(new AppError('Unable to create new status post', 500))
        if (req.files)
            req.files.forEach((item) => deleteMediaFile(item.location))
        return
    }

    if (req.files) {
        req.files.forEach((item) =>
            newStatusPost.mediaFiles.push(item.location)
        )
    }

    await newStatusPost.save()
    res.status(200).json(newStatusPost)
})

exports.getAllStatusPostsOfAUser = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) return next(new AppError('Unable to find this user', 404))
    const statusPosts = await StatusPost.find({ author: userId })
    res.status(200).json(statusPosts)
})

exports.updateStatusPostById = asyncCatch(async (req, res, next) => {
    const { body: statusPostBody } = req
    const { statusPostId } = req.params

    const updatedPost = await StatusPost.findByIdAndUpdate(
        statusPostId,
        statusPostBody,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!updatedPost)
        return next(new AppError('Unable to update status post', 500))

    res.status(200).json(updatedPost)
})

exports.deleteStatusPostById = asyncCatch(async (req, res, next) => {
    const { statusPostId } = req.params

    const deletedPost = await StatusPost.findByIdAndDelete(statusPostId)
    if (!deletedPost)
        return next(
            new AppError('Invalid status post id or already removed', 400)
        )

    deletedPost.mediaFiles.forEach((location) => deleteMediaFile(location))

    res.status(204).end()
})
