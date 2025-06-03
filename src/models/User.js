const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscription: {
        type: {
            type: String,
            enum: ['free', 'basic', 'premium'],
            default: 'free'
        },
        startDate: Date,
        endDate: Date,
        analysisCredits: {
            type: Number,
            default: 5 // Free users get 5 analyses per month
        }
    },
    profile: {
        name: String,
        bio: String,
        avatar: String,
        socialLinks: {
            instagram: String,
            twitter: String,
            website: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date
});

module.exports = mongoose.model('User', userSchema); 