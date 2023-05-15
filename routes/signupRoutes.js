const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.get('/signup', function (req, res) {
    res.render('signup')
})

router.post('/signup', function(req, res){
    const {firstName, lastName, email, phoneNumber, password} = req.body;

    const newUser = new User({
        firstName, lastName, email, phoneNumber, password, isAdmin: false
    });

    User.register ( newUser, password, function(err, user){
        if (err){
            console.log(err);
            res.redirect('/signup');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/cart');
            });
        }});

});

module.exports = router;