// routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, authorizeRoles } = require('./authMiddleware');
router.post('/addCategory',authMiddleware,authorizeRoles('super admin'), categoryController.createCategory);
router.get('/all', categoryController.getCategories);
router.put('/ediCategory/:id', categoryController.updateCategory);
router.delete('/deletCategory/:id',authMiddleware,authorizeRoles('super admin'), categoryController.deleteCategory);

module.exports = router;
