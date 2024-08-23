const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorpost.controller');

// Define the routes
router.post('/', sponsorController.createSponsorPost);
router.get('/', sponsorController.getAllSponsorPost);
router.get('/:id', sponsorController.getPostSponsorById);
router.put('/:id', sponsorController.updateSponsorPostById);
router.delete('/:id', sponsorController.deleteSponsorPostById);

module.exports = router;
