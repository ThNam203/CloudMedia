const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const uuid = require('uuid')
const multerS3 = require('multer-s3')

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
        contentType: function (req, file, cb) {
            cb(null, file.mimetype)
        },
        contentDisposition: function (req, file, cb) {
            cb(null, file.originalname)
        },
        key: function (req, file, cb) {
            cb(null, uuid.v4())
        },
    }),
})

exports.deleteMediaFile = (path) => {
    const command = new DeleteObjectCommand({
        Bucket: 'workwise',
        Key: path.substring(path.lastIndexOf('/') + 1, path.length),
    })

    s3Client.send(command).catch(() => {})
}
