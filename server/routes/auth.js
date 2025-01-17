const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const authmiddleware = require('../middleware/auth')

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login', session: false }),
    (req, res) => {
        const token = jwt.sign(
            {id: req.user._id, email: req.user.email, pic: req.user.picture},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    }
)

router.get('/verify', 
    authmiddleware,
    (req, res) => {
        res.json({ user: req.user })
    }
)

module.exports = router