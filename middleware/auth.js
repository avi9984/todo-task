const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'Please login to access this' })
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decoded.id)
        if (!req.user) return res.status(401).json({ message: "Unauthorized" })
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

const adminAuth = async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(401).json({ message: 'You are not authorized to access this resource' })
    }
    next()
}

module.exports = { userAuth, adminAuth }