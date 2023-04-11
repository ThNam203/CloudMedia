const jwt = require('jsonwebtoken')

const JobPost = require('../models/JobPost')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const User = require('../models/User')

exports.isOwner = asyncCatch(async (req, res, next) => {
    const jwtToken = req.headers.authorization.split(' ')[1]
    const { id: userId } = jwt.decode(jwtToken)
    const { user_id: idParam } = req.params
    if (userId !== idParam)
        return next(
            new AppError(
                `Authorization header and user's id is not match together`,
                400
            )
        )

    next()
})

exports.createNewJobPost = asyncCatch(async (req, res, next) => {
    const userId = req.params.user_id
    req.body.author = userId

    const newJobPost = await JobPost.createNewJobPost(req)

    if (!newJobPost)
        return next(new AppError('Unable to create a new job post', 500))

    const user = await User.findById(userId)
    if (!user)
        return next(
            new AppError('Invalid user or missing user posting this job', 400)
        )

    user.jobPosts.push(newJobPost.id)
    await user.save()

    return res.status(200).json({
        status: 'success',
        data: newJobPost,
    })
})

exports.getAllJobPosts = asyncCatch(async (req, res, next) => {
    const { user_id: userId } = req.params

    const freshJobPost = await JobPost.find({ author: userId })

    return res.status(200).json({
        status: 'success',
        data: freshJobPost,
    })
})

exports.updateJobPostById = asyncCatch(async (req, res, next) => {
    const { body: jobPostBody } = req
    const { job_post_id: jobPostId } = req.params

    const excludeFiels = ['id', 'author']
    excludeFiels.forEach((field) => delete jobPostBody[field])

    const updatedPost = await JobPost.findByIdAndUpdate(
        jobPostId,
        jobPostBody,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!updatedPost)
        return next(new AppError('Unable to update job post', 500))

    res.status(200).json({
        status: 'success',
        body: updatedPost,
    })
})

exports.deleteJobPostById = asyncCatch(async (req, res, next) => {
    const { job_post_id: jobPostId } = req.params

    const deletedPost = await JobPost.findByIdAndDelete(jobPostId)
    if (!deletedPost)
        return next(new AppError('Invalid job post id or already removed', 400))

    const author = await User.findById(deletedPost.author)
    const deleteIndex = author.jobPosts.indexOf(jobPostId)
    author.jobPosts.splice(deleteIndex, 1)

    res.status(200).json({
        status: 'success',
        data: {
            message: `Successfully deleted job post with id ${jobPostId}`,
        },
    })
})
