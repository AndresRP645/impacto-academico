const pool = require('../database');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isNotLoggedIn,isLoggedIn  } = require('../lib/auth');

router.get('/login', isNotLoggedIn, async (req, res) => {
    const rows = await pool.query("select * from Carrera");
    var Carrera = {};
    rows.forEach(reg => {
        Carrera[reg.id_Carrera] = [reg.nm_Carrera];
    });

    res.render('auth/login', {Carrera});
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
    req.session.destroy();
});

module.exports = router;