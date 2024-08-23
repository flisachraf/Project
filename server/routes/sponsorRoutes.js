const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sponsor = require('../models/sponsor');
const { authMiddleware, authorizeRoles } = require('./authMiddleware');
const upload = require('../config/upload');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../../.env' })


// Register a new sponsor
router.post('/register',authMiddleware,authorizeRoles('super admin'), async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let sponsor = await Sponsor.findOne({ email });

    if (sponsor) {
      return res.status(400).json({ msg: 'Sponsor already exists' });
    }

    sponsor = new Sponsor({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    sponsor.password = await bcrypt.hash(password, salt);

    await sponsor.save();
    res.status(201).json({ message: "Sponsor registration was sending with succesfuly" });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login sponsor
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  try {
    let sponsor = await Sponsor.findOne({ email });
    console.log(sponsor)
    if (!sponsor) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    if (sponsor.status==="Desactive") {
      return res.status(401).json({ msg: 'Your account desactivate' });
    }

    const isMatch = await bcrypt.compare(password, sponsor.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const sponsorToken = jwt.sign({
        id: sponsor.id,
        role:"sponsor"
      }, process.env.JWT);
    return res.status(200).json({ 'token': sponsorToken ,sponsor:{
        id: sponsor.id,
        role:"sponsor"
      }});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update sponsor profile
router.put('/profile',authMiddleware,authorizeRoles('sponsor'), async (req, res) => {
  const { name, password } = req.body;

  try {
    let sponsor = await Sponsor.findById(req.sponsor.id);

    if (!sponsor) {
      return res.status(404).json({ msg: 'Sponsor not found' });
    }

    sponsor.name = name || sponsor.name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      sponsor.password = await bcrypt.hash(password, salt);
    }

    await sponsor.save();

    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Upload sponsoring file
router.put('/activer/:id',authMiddleware,authorizeRoles('super admin'), async (req, res) => {

  console.log("*************************jmkjbfkjbfkb*********")

  try {
    let sponsor = await Sponsor.findById(req.params.id);
    console.log("*************************jmkjbfkjbfkb*********")
    if (!sponsor) {
      return res.status(404).json({ msg: 'Sponsor not found' });
    }
    console.log(sponsor)
    sponsor.status="Active"

    await sponsor.save();

    res.json({ msg: 'Sponsoring actived successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.put('/desactiver/:id',authMiddleware,authorizeRoles('super admin'), async (req, res) => {

  try {
    let sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ msg: 'Sponsor not found' });
    }
    sponsor.status="Desactive"

    await sponsor.save();

    res.json({ msg: 'Sponsoring actived successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/upload',authMiddleware,authorizeRoles('sponsor'), async (req, res) => {
  const { sponsoringFile } = req.body;

  try {
    let sponsor = await Sponsor.findById(req.sponsor.id);

    if (!sponsor) {
      return res.status(404).json({ msg: 'Sponsor not found' });
    }

    sponsor.sponsoringFile = sponsoringFile || sponsor.sponsoringFile;

    await sponsor.save();

    res.json({ msg: 'Sponsoring file uploaded successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get("/allSponsors",authMiddleware,authorizeRoles('super admin'),async(req,res)=>{
  try{
    const results= await Sponsor.find();
    res.status(200).json(results);
  }
  catch(error){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.delete('/:id',authMiddleware,authorizeRoles('super admin'),async(req,res)=>{

  try{
    const id =req.params.id;
    console.log("************",req.params.id)
    const sponsor = await Sponsor.findById(id)
    if (!sponsor) return res.status(404).json({ message: 'User not found' });
    
    await Sponsor.findByIdAndDelete(id);

    res.status(200).json({message:"the sponsor was deleted succesfuly"});
  }
  catch(error){
    console.error(error.message);
    res.status(400).send('Server Error');
  }
});
router.get("/onesponsor/:id",authMiddleware,authorizeRoles('sponsor'),async(req,res)=>{
  const sponsorId = req.params.id
        try {
            const sponsor = await Sponsor.findById(sponsorId);
            res.json(sponsor);
        } catch (err) {
            res.status(400).json(err);
        }
})

router.put('/editSPonsor/:id', authMiddleware, authorizeRoles('sponsor'), upload.single('sponsoringFile'), async (req, res) => {
  const { id } = req.params;
  const { name, email, oldPassword, newPassword } = req.body;

  let sponsor;
  let tempFilePath = null;

  try {
    // Find the sponsor by ID
    sponsor = await Sponsor.findById(id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }

    // Handle password change
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, sponsor.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      sponsor.password = await bcrypt.hash(newPassword, 10);
    }

    // Update sponsor details
    if (name) sponsor.name = name;
    if (email) sponsor.email = email;

    // Handle file upload
    if (req.file) {
      tempFilePath = req.file.path; // Save the temporary file path

      // Delete the old sponsoring file if it exists
      if (sponsor.sponsoringFile) {
        fs.unlink(path.join(__dirname, '..', sponsor.sponsoringFile), (err) => {
          if (err) {
            console.error('Error deleting old sponsoring file:', err);
          }
        });
      }

      // Set the new file path temporarily
      sponsor.sponsoringFile = tempFilePath;
    }

    // Save the updated sponsor details
    await sponsor.save();

    // If update is successful, move the file to its final location
    if (tempFilePath) {
      fs.rename(tempFilePath, path.join(__dirname, '..', sponsor.sponsoringFile), (err) => {
        if (err) {
          console.error('Error moving file:', err);
        }
      });
    }

    res.status(200).json(sponsor);
  } catch (error) {
    // If there's an error, delete the temporary file if it exists
    if (tempFilePath) {
      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.error('Error deleting temporary file:', err);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }

});

router.get('/allActiveSponsors',async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ sponsoringFile: { $ne: null }, status: "Active" });
    console.log(sponsors)
    const sponsoringFiles = sponsors.map(sponsor => sponsor.sponsoringFile);
    res.status(200).json(sponsoringFiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
