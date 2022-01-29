const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const signup = express.Router();

const userSchema = require('../schema/userSchema');
const users = new mongoose.model('user', userSchema);

signup.post('/signup', async (req, res) => {
    try{
        const hashPass = await bcrypt.hash(req.body.password, 10);

        const newUser = new users({
            name: req.body.name,
            username: req.body.username,
            password: hashPass,
            status: req.body.status
        });
    
        await newUser.save();

        res.status(200).json({
            message: 'user add successfully'
        })
    }catch{
        res.status(400).json({
            error: 'user add failed'
        })
    }
});

module.exports = signup;