const express = require('express');
const router = express.Router();
const { userAuth, adminAuth } = require('../middleware/auth')
const { registerUser, loginUser, profile, updateProfile, getAllUsers } = require('../controllers/user');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', userAuth, profile);
router.put('/update', userAuth, updateProfile);
router.get('/all', userAuth, adminAuth, getAllUsers);


module.exports = router