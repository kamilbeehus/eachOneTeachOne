import User from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
        res.message('User created successfully');
    } catch (error) {
        res.status(500).json({message: 'Server error'});
        res.message('Server error');
    }
};
