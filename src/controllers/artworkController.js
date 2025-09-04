const Artwork = require('../models/Artwork');

// Create new artwork
exports.createArtwork = async (req, res) => {
    try {
        const artwork = new Artwork({
            ...req.body,
            userId: req.body.userId // In production, this would come from authenticated user
        });
        const savedArtwork = await artwork.save();
        res.status(201).json(savedArtwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all artworks for a user
exports.getUserArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find({ userId: req.params.userId });
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single artwork
exports.getArtwork = async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json(artwork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update artwork analysis
exports.updateArtworkAnalysis = async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        artwork.analyses.push(req.body.analysis);
        const updatedArtwork = await artwork.save();
        res.json(updatedArtwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete artwork
exports.deleteArtwork = async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        await Artwork.deleteOne({ _id: req.params.id });
        res.json({ message: 'Artwork deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 