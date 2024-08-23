const Sponsor = require('../models/sponsorpost.model'); // Assurez-vous que le chemin est correct

exports.createSponsorPost = async (req, res) => {
    try {
        const sponsor = new Sponsor(req.body);
        await sponsor.save();
        res.status(201).json(sponsor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSponsorPost = async (req, res) => {
    try {
        const sponsors = await Sponsor.find();
        res.status(200).json(sponsors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPostSponsorById = async (req, res) => {
    try {
        const sponsor = await Sponsor.findById(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor post not found' });
        }
        res.status(200).json(sponsor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSponsorPostById = async (req, res) => {
    try {
        const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor post not found' });
        }
        res.status(200).json(sponsor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSponsorPostById = async (req, res) => {
    try {
        const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor post not found' });
        }
        res.status(200).json({ message: 'Sponsor post deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
