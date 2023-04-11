const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: [1, 'Company name must not be empty'],
        },
        logoUrl: {
            type: String,
            required: true,
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
            min: [1, 'Education must not be empty'],
        },
        experience: {
            type: String,
            min: [1, 'Experience must not be empty'],
        },
        languageProficiency: {
            type: String,
            min: [1, 'Language proficiency must not be empty'],
        },
        certifications: {
            type: String,
            min: [1, 'Certifications must not be empty'],
        },
        interpersonalSkills: {
            type: String,
            min: [1, 'Interpersonal must not be empty'],
        },
        availability: {
            type: String,
            min: [1, 'Availability must not be empty'],
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
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    requirements: jobRequirementsSchema,
    deadline: {
        type: Date,
        required: true,
    },
})

jobPostSchema.statics.createNewJobPost = async function (req) {
    const { body } = req

    return this.create({
        author: body.author,
        title: body.title,
        description: body.description,
        company: body.company,
        location: body.location,
        salary: body.salary,
        requirements: body.requirements,
        deadline: body.deadline,
    })
}

module.exports = mongoose.model('JobPost', jobPostSchema)
