const bcrypt = require('bcrypt');
const User = require('../models/user');

const seedAdmin = async () => {
    const admin = await User.findOne({ role: 'Admin' });
    if (admin) {
        console.log("Admin is already exist");
        return;
    }
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const newAdmin = new User({
        email: "admin@gmail.com",
        phone: "1234567890",
        password: hashedPassword,
        role: "Admin",
    })
    await newAdmin.save();
    console.log("Admin created successfully");
}

module.exports = seedAdmin;