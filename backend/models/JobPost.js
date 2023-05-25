const mongoose = require('mongoose')
const User = require('./User')

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        logoUrl: {
            type: String,
            trim: true,
        },
        linkToWebsite: {
            type: String,
            trim: true,
        },
    },
    {
        _id: false,
    }
)

const jobRequirementsSchema = new mongoose.Schema(
    {
        education: {
            type: String,
            trim: true,
        },
        experience: {
            type: String,
            trim: true,
        },
        languageProficiency: {
            type: String,
            trim: true,
        },
        salary: {
            type: String,
            trim: true,
        },
        certifications: {
            type: String,
            trim: true,
        },
        interpersonalSkills: {
            type: String,
            trim: true,
        },
        availability: {
            type: String,
            trim: true,
        },
    },
    {
        _id: false,
    }
)

const jobPostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        min: [5, 'Job title must be at least 5 characters'],
        trim: true,
    },
    description: {
        type: String,
        required: true,
        min: [20, 'Job description must be at least 20 characters'],
        trim: true,
    },
    company: companySchema,
    workplaceType: {
        type: String,
        enum: ['On-site', 'Hybrid', 'Remote'],
        required: true,
    },
    employeeLocation: {
        type: String,
        required: true,
        trim: true,
    },
    jobType: {
        type: String,
        enum: [
            'Full-time',
            'Part-time',
            'Contract',
            'Temporary',
            'Other',
            'Volunteer',
            'Internship',
        ],
        required: true,
    },
    requirements: jobRequirementsSchema,
    deadline: {
        type: Date,
        trim: true,
    },
})

jobPostSchema.statics.createNewJobPost = async function (req) {
    const { body } = req

    return this.create({
        author: body.author,
        title: body.title,
        description: body.description,
        company: body.company,
        workplaceType: body.workplaceType,
        employeeLocation: body.employeeLocation,
        jobType: body.jobType,
        requirements: body.requirements,
        deadline: body.deadline,
    })
}

module.exports = mongoose.model('JobPost', jobPostSchema)
