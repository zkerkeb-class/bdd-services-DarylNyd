const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: {
        type: String,
        required: true
    },
    publicUrl: {
        type: String,
        unique: true
    },
    metadata: {
        size: String,
        medium: String,
        style: String,
        dateCreated: Date
    },
    analyses: [{
        type: {
            type: String,
            enum: ['general', 'technique', 'composition', 'color'],
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        results: {
            technicalQuality: String,
            strengths: String,
            areasForImprovement: String,
            suggestions: [String],
            composition: String,
            colorTheory: String,
            styleContext: String
        },
        learningResources: [{
            title: String,
            description: String,
            url: String,
            type: String,
            difficulty: String
        }]
    }],
    tags: [String],
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
artworkSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Artwork', artworkSchema); 