const express = require('express');
const User = require('../models/userModel');
const passport = require('passport');

const router = express.Router();

router.get('/signin', function (req, res) {
    res.render('signin')
});


router.post('/signin', passport.authenticate('local', {
    successRedirect: '/cart',
    failureRedirect: '/signin'
}));

module.exports = router;