const uuid = require('uuid')
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const multer = require('multer')
const User = require('../models/User')
const asyncCatch = require('../utils/asyncCatch')
const AppError = require('../utils/AppError')

const s3 = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

exports.uploadProfileImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'workwise',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, uuid.v4())
        },
    }),
})

exports.updateProfileImage = asyncCatch(async (req, res, next) => {
    if (!req.file || !req.file.location)
        return next(new AppError('Unable to upload profile image', 500))

    const userId = req.params.user_id
    const user = await User.findById(userId)
    user.profileImagePath = req.file.location
    await user.save()

    res.status(200).json({
        status: 'success',
        data: req.file.location,
    })
})

exports.getUserById = asyncCatch(async (req, res, next) => {
    const { user_id: userId } = req.params
    const user = await User.findById(userId)
    if (!user) return next(new AppError('No user found!', 400))

    res.status(200).json({
        status: 'success',
        data: user,
    })
})

exports.updateUserById = asyncCatch(async (req, res, next) => {
    const { user_id: userId } = req.params
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updatedUser) return next(new AppError('No user found!', 400))

    res.status(200).json({
        status: 'success',
        data: updatedUser,
    })
})
