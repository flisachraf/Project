const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be present.'],
        minlength: [3, 'Username must be at least 3 characters.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email must be present."],
        validate: [isEmail, "Email is not valid."],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must be provided.'],
        minlength: [6, "Password too short."]
    },
    role: {
        type: String,
        enum: ['super admin', 'admin', 'sponsor', 'editor'],
        
    },
    image :{
        type:String 
    }
}, { timestamps: true });

// Virtual for confirm password
UserSchema.virtual('confirmPW')
    .get(function () {
        return this._confirmPW;
    })
    .set(function (value) {
        this._confirmPW = value;
    });

// Validate password and confirm password
UserSchema.pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this.confirmPW) {
        this.invalidate('confirmPW', "Passwords must match.");
    }
    next();
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.error("Error while hashing Password", error);
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);
