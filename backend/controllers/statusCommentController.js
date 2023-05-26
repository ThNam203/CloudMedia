const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const uuid = require('uuid')
const multerS3 = require('multer-s3')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const User = require('../models/User')
const StatusPost = require('../models/StatusPost')
const StatusComment = require('../models/StatusComment')
const Notification = require('../models/Notification')

const sendNotificationOnSomeoneComment = async (
    statusPostId,
    commentAuthorId
) => {
    const statusPost = await StatusPost.findById(statusPostId)
    const commentor = await User.findById(commentAuthorId)
    await Notification.create({
        userId: statusPost.author,
        notificationType: 'Comment',
        content: `${commentor.name} has commented about your status`,
        isRead: false,
        link: statusPostId,
    })
}

const s3Client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

exports.uploadMediaFile = multer({
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

exports.getCommentById = asyncCatch(async (req, res, next) => {
    const { commentId } = req.params
    const comment = await StatusComment.findById(commentId).populate(
        'author',
        '_id profileImagePath email'
    )
    if (!comment) return next(new AppError('Unable to get the comment', 500))
    res.status(200).json(comment)
})

exports.createNewComment = asyncCatch(async (req, res, next) => {
    const { statusPostId, userId } = req.params
    const { content } = req.body
    const newComment = await StatusComment.create({
        author: userId,
        statusPostId: statusPostId,
        content: content,
        mediaFile: req.file.location,
    })

    if (!newComment) {
        next(new AppError('Unable to create comment', 500))
        deleteMediaFile(req.file.location)
        return
    }

    sendNotificationOnSomeoneComment(statusPostId, userId)
    await newComment.populate('author', '_id profileImagePath email')
    res.status(200).json(newComment)
})

exports.deleteComment = asyncCatch(async (req, res, next) => {
    const { commentId } = req.params

    const deletedComment = await StatusComment.findByIdAndDelete(commentId)
    if (!deletedComment)
        return next(new AppError('Unable to remove the comment', 500))

    await deleteMediaFile(deletedComment.mediaFile)
    res.status(204).end()
})

exports.getAllCommentsOfStatusPost = asyncCatch(async (req, res, next) => {
    const { statusPostId } = req.params
    const comments = await StatusComment.find({
        statusPostId: statusPostId,
    }).populate('author', '_id profileImagePath email')
    res.status(200).json(comments)
})

// exports.updateComment = asyncCatch(async (req, res, next) => {
//     const { commentId } = req.params

//     const updatedPost = await StatusPost.findByIdAndUpdate(
//         statusPostId,
//         statusPostBody,
//         {
//             new: true,
//             runValidators: true,
//         }
//     )

//     if (!updatedPost)
//         return next(new AppError('Unable to update status post', 500))

//     res.status(200).json(updatedPost)
// })
