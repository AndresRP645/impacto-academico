const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/answers', isLoggedIn, (req, res) => {
    res.redirect('/materias');
});

router.post('/send', isLoggedIn, async (req, res) => {

    if (req.user.id === undefined) {
        req.logOut();
        req.flash('message', 'ocurrio un error ingresa de nuevo por favor');
        res.redirect('/login');
        req.session.destroy();
    }
    else {
        const aux = JSON.parse(JSON.stringify(req.body));
        const keys = Object.keys(aux);
        
        const sql = "INSERT INTO `RespIdntInst`VALUES (0, " + req.user.id + ", " + aux[keys[0]] + ", " + aux[keys[1]] + ");";
    
        await pool.query(sql);
    
        req.logOut();
        req.flash('success', 'Respuestas enviadas Exitosamente');
        res.redirect('/login');
        req.session.destroy();
    }

});


module.exports = router;
