const JobPost = require('../models/JobPost')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const User = require('../models/User')

exports.getAJobPostById = asyncCatch(async (req, res, next) => {
    const { jobPostId } = req.params
    const jobPost = await JobPost.findById(jobPostId)

    if (!jobPost)
        return next(
            new AppError(
                `Unable to find the jobpost or invalid jobpost's id`,
                500
            )
        )

    res.status(200).json(jobPost)
})

exports.createNewJobPost = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    req.body.author = userId

    const newJobPost = await JobPost.createNewJobPost(req)

    if (!newJobPost)
        return next(new AppError('Unable to create a new job post', 500))

    res.status(200).json(newJobPost)
})

exports.getAllJobPostsOfAUser = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) return next(new AppError('Unable to find this user', 400))
    const jobPosts = await JobPost.find({ author: userId })

    res.status(200).json(jobPosts)
})

exports.updateJobPostById = asyncCatch(async (req, res, next) => {
    const { body: jobPostBody } = req
    const { jobPostId } = req.params

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

    res.status(200).json(updatedPost)
})

exports.deleteJobPostById = asyncCatch(async (req, res, next) => {
    const { jobPostId } = req.params

    const deletedPost = await JobPost.findByIdAndDelete(jobPostId)
    if (!deletedPost)
        return next(new AppError('Invalid job post id or already removed', 400))

    res.status(204).end()
})
