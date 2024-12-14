const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validEmail, validPwd } = require('../utils/validator');


const registerUser = async (req, res) => {
    try {
        const { email, phone, password, cnfpassword, role } = req.body;
        if (!(email && phone && password && cnfpassword)) {
            return res.status(400).json({ status: false, message: "All fields are required" })
        }
        if (!validEmail(email)) {
            return res.status(400).json({ status: false, message: "Invalid email" })
        }
        const checkEmail = await User.findOne({ email: email.toLowerCase() });
        if (checkEmail) {
            return res.status(400).json({ status: false, message: "User already exist" })
        }
        if (!validPwd(password && cnfpassword)) {
            return res.status(400).json({ status: false, message: "Password should be 8 characters long and must contain one of 0-9,A-Z,a-z and special characters" })
        }

        if (password !== cnfpassword) {
            return res.status(400).json({ status: false, message: "Password does't match" })
        } else {
            body.password = await bcrypt.hash(body.password, 10)
        }
        let obj = {
            email: email.toLowerCase(),
            phone,
            role,
            password: body.password
        }
        await User.create(obj)
        return res.status(201).json({ status: true, message: "User created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ status: false, message: "Email and password is requied fileds" })
        }
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid email or password" })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ status: false, message: "Invalid email or password" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({ status: true, message: "Login successfully", token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const profile = async (req, res) => {
    try {
        return res.status(200).json({ status: true, message: "User profile", data: req.user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { email, phone } = req.body;
        req.user.email = email || req.user.email;
        req.user.phone = phone || req.user.phone;
        await req.user.save()
        return res.status(200).json({ status: true, message: "Profile updated successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({ status: true, message: "Users list", data: users })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
module.exports = { registerUser, loginUser, profile, updateProfile, getAllUsers }