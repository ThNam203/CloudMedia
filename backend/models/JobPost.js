const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logoUrl: {
            type: String,
        },
        linkToWebsite: {
            type: String,
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
        },
        experience: {
            type: String,
        },
        languageProficiency: {
            type: String,
        },
        salary: {
            type: String,
        },
        certifications: {
            type: String,
        },
        interpersonalSkills: {
            type: String,
        },
        availability: {
            type: String,
        },
    },
    {
        _id: false,
        required: true,
    }
)

const jobPostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: [5, 'Job title must be at least 5 characters'],
    },
    description: {
        type: String,
        required: true,
        min: [20, 'Job description must be at least 20 characters'],
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
