const express = require('express');
const router = express.Router();
const User = require('../models/user');

// CREATE / CHECK PHONE
router.post('/', async (req, res) => {
    const { phoneNumber, firstName, lastName, address, countryCode } = req.body;

    if (!phoneNumber) return res.status(400).json({ message: 'Phone number is required' });

    try {
        let user = await User.findOne({ phoneNumber });
        console.log(user);
        if (user) return res.status(200).json({ exists: true, message: 'Phone number already exists', user });

        user = new User({ phoneNumber, firstName, lastName, address, countryCode });
        await user.save();
        res.status(201).json({ exists: false, message: 'User added successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// READ ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// READ SINGLE USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
    const { phone, name, address } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { phone, name, address },
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
