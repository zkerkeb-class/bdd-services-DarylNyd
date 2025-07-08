const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return !this.socialLogin; // Password required only if not social login
        }
    },
    socialLogin: {
        provider: {
            type: String,
            enum: ['google', null],
            default: null
        },
        socialId: String,
        accessToken: String
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'artist'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    phone: {
        number: {
            type: String,
            required: false
        },
        countryCode: {
            type: String,
            required: false
        }
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
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    currentPlan: {
        type: String,
        default: 'free'
    }
});

// Update the updatedAt field on save
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('User', userSchema); 