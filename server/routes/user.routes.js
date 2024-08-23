const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    getLoggedUser,
    updateExistingUser,
    deleteUser,
    registerAdmin,
    getAllUsers,
    getUserById,
    updateImageProfile
} = require('../controllers/user.controller');
const { authMiddleware, authorizeRoles } = require('./authMiddleware');
const upload = require('../config/upload');
// User registration
router.post('/register', register);

// Admin registration
router.post('/admin/register', registerAdmin);

// User login
router.post('/login', login);

// User logout
router.post('/logout', logout);

// Get logged-in user
router.get('/', getLoggedUser);

// Get all users
router.get('/all',authMiddleware,authorizeRoles('super admin'), getAllUsers);

// Get user by ID
router.get('/:id' ,authMiddleware,authorizeRoles('super admin',"admin","editor"), getUserById);

// Update existing user
router.patch('/:id',authMiddleware,authorizeRoles('super admin'), updateExistingUser);

// Delete user
router.delete('/:id',authMiddleware,authorizeRoles('super admin'), deleteUser);
router.put('/updateProfileImage', authMiddleware,authorizeRoles('super admin',"admin","editor"), upload.single('image'),updateImageProfile );

module.exports = router;
