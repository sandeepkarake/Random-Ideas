const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea')

// Get all Ideas
router.get('/', async (req, res) => {

    try {
        const ideas = await Idea.find();
        res.send({ success: true, data: ideas })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: 'Something went wrong'
        })
    }
})
// Get single Idea
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.send({ success: true, data: idea })
    } catch (error) {

        if (!idea) {
            return res.status(404).json({
                success: false,
                error: 'Resource Not found'
            })
        }
    };

})
// Add an Idea
router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    try {
        const savedIDea = await idea.save();
        res.json({
            success: true,
            data: savedIDea
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: 'Something went wrong'
        })
    }

})
// Update an Idea
router.put('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        if (idea.username = req.body.username) {
            const updatedIdea = await Idea.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag
                    }
                },
                {
                    new: true
                }
            )
            return res.json({ success: true, data: updatedIdea })
        }
        // If user do not match
        res.status(403).json({ success: false, error: 'You are not authorized to update' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
    }
})
// Delete an Idea
router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        // match the usernames
        console.log(idea.username);
        console.log(req.body.username);
        if (idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id)
            return res.send({ success: true, data: {} })
        }
        // usernames do not match
        res.status(403).json({ success: false, error: 'You are not authorized to delete' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
    }
})
module.exports = router;