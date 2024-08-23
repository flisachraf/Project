const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

module.exports = {
    register: async (req, res) => {
        try {
            console.log(req.body);
            const userFromDb = await User.findOne({ email: req.body.email });
            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } });
            }
            const user = await User.create(req.body);
            // const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // res.status(201).cookie('userToken', userToken).json({ 'token': userToken });
            res.status(201).json({ message: "your registration was sending with succesfuly" });

        } catch (error) {
            res.status(400).json(error.errors);
        }
    },
    registerAdmin: async (req, res) => {
        
        try {
            const userFromDb = await User.findOne({ email: req.body.email });
            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } });
            }
            
            const userD = { ...req.body, role: 'super admin' };
            const user = await User.create(userD);
            // const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(201).json({ message: "your registration was sending with succesfuly" });
        } catch (error) {
            res.status(400).json(error.errors);
        }
    },
    login: async (req, res) => {
        console.log("*************",req.body)
        const userFromDb = await User.findOne({ email: req.body.email });
        if (!userFromDb) {
            
            return res.status(400).json({ email: { message: "Email doesn't exist." } });
        } else {
            try {
                if (!userFromDb.role) return res.status(401).json({message:"your account not active"})
                const compareResult = await bcrypt.compare(req.body.password, userFromDb.password);
                if (!compareResult) {
                    return res.status(400).json({ password: { message: "Wrong password." } });
                } else {
                    const userToken = jwt.sign({ id: userFromDb._id ,role: userFromDb.role}, process.env.JWT);
                    return res.status(200).json({ 'token': userToken ,user:userFromDb});
                }
            } catch (error) {
                console.log("l'erreur hni")
                res.status(400).json(error);
            }
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('userToken');
            res.status(204).json({ message: "User Logged out successfully." });
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getLoggedUser : async (req, res) => {
        let userToken = req.headers['authorization'];
        
        // Check if token is prefixed with "Bearer "
        if (userToken && userToken.startsWith('Bearer ')) {
            userToken = userToken.slice(7); // Remove "Bearer " prefix
        }
        
        if (!userToken) {
            return res.status(400).json({ message: 'Token not found.' });
        }
        
        try {
            const token = jwt.verify(userToken, process.env.JWT); // Ensure the secret key is correct
            const loggedUser = await User.findById(token.id).select('-password -createdAt');
            return res.status(200).json({ loggedUser });
        } catch (error) {
            console.log("*********", error);
            res.status(400).json({ message: 'Invalid token.' }); // Improved error message
        }},
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    getUserById: async (req, res) => {
        const userId = req.user.id
        try {
            const user = await User.findById(userId);
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await User.findByIdAndDelete(userId);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    updateExistingUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    updateImageProfile :async (req, res) => {
        const userId = req.user.id; // Assuming the user ID is stored in the JWT payload
      
        try {
          const user = await User.findById(userId);
          if (!user) return res.status(404).json({ message: 'User not found' });
      
          if (req.file) {
            user.image = req.file.path; // Save the path of the uploaded image
          }
      
          await user.save();
          res.status(200).json({ message: 'Profile image updated successfully' });
        } catch (error) {
          console.error('Error updating profile image:', error);
          res.status(500).json({ message: 'Server error' });
        }
      }
};
