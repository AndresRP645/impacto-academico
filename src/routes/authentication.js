const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isNotLoggedIn,isLoggedIn  } = require('../lib/auth');

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('login', {
        successRedirect: '/materias',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;