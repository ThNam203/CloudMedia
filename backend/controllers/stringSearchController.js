/* eslint-disable no-plusplus */
const User = require('../models/User')
const asyncCatch = require('../utils/asyncCatch')

function levenshteinDistance(str1, str2) {
    const m = str1.length
    const n = str2.length
    const dp = []

    for (let i = 0; i <= m; i++) {
        dp[i] = []
        dp[i][0] = i
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1] + 1, // substitution
                    dp[i][j - 1] + 1, // insertion
                    dp[i - 1][j] + 1 // deletion
                )
            }
        }
    }

    return dp[m][n]
}

// using fuzzy
async function emailSearch(query, userId, threshold = 0.5) {
    if (query.includes('@')) {
        query = query.substring(0, query.indexOf('@')).toLowerCase()
    }
    query = query.toLowerCase()
    const users = await User.find({}).select('name email _id profileImagePath')
    const result = []

    for (let i = 0; i < users.length; i++) {
        const email = users[i].email
            .substring(0, users[i].email.indexOf('@'))
            .toLowerCase()

        const distance = levenshteinDistance(query, email)
        const maxLength = Math.max(query.length, email.length)
        const similarityScore = 1 - distance / maxLength

        if (similarityScore >= threshold) {
            users[i] = users[i].toObject()
            if (users[i].connections && users[i].connections.includes(userId))
                users[i].isFriend = 'true'
            else users[i].isFriend = 'false'

            result.push(users[i])
        }
    }

    return result
}

// using fuzzy
async function nameSearch(query, userId, threshold = 0.5) {
    query = query.toLowerCase()
    const users = await User.find({}).select('name email _id profileImagePath')
    const result = []

    for (let i = 0; i < users.length; i++) {
        const username = users[i].name.toLowerCase()
        const distance = levenshteinDistance(query, username)
        const maxLength = Math.max(query.length, username.length)
        const similarityScore = 1 - distance / maxLength

        if (similarityScore >= threshold) {
            users[i] = users[i].toObject()
            if (users[i].connections && users[i].connections.includes(userId))
                users[i].isFriend = 'true'
            else users[i].isFriend = 'false'

            result.push(users[i])
        }
    }

    return result
}

const searchByEmail = asyncCatch(async (req, res, next) => {
    const { query, userId } = req.body
    const result = await emailSearch(query, userId)
    res.status(200).json(result)
})

const searchByName = asyncCatch(async (req, res, next) => {
    const { query, userId } = req.body
    const result = await nameSearch(query, userId)
    res.status(200).json(result)
})

module.exports = {
    searchByEmail,
    searchByName,
}
