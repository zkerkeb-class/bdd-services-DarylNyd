const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');

// Create a new artwork
router.post('/', artworkController.createArtwork);

// Get all artworks for a user
router.get('/user/:userId', artworkController.getUserArtworks);

// Get a single artwork
router.get('/:id', artworkController.getArtwork);

// Update artwork analysis
router.patch('/:id/analysis', artworkController.updateArtworkAnalysis);

// Delete an artwork
router.delete('/:id', artworkController.deleteArtwork);

module.exports = router; 