const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, (req, res) => {
    res.render('answers/add');
});

router.post('/', isLoggedIn, async (req, res) => {
    const { p1, p2, p3, p4, p5, p6, p7, p8, p9,
        p10, p11, p12, p13, p14, p15, p16, p17, p18, p19,
        p20, p21 } = req.body;
        const id = req.user.id;
    const DesempeñoDocente = {
        id_alumno: id,
        Pregunta_1: p1,
        Pregunta_2: p2,
        Pregunta_3: p3,
        Pregunta_4: p4,
        Pregunta_5: p5,
        Pregunta_6: p6,
        Pregunta_7: p7,
        Pregunta_8: p8,
        Pregunta_9: p9
    };
    const DesempeñoEstudiantil = {
        id_alumno: id,
        Pregunta_10: p10,
        Pregunta_11: p11,
        Pregunta_12: p12,
        Pregunta_13: p13,
        Pregunta_14: p14,
        Pregunta_15: p15,
        Pregunta_16: p16,
        Pregunta_17: p17,
        Pregunta_18: p18,
        Pregunta_19: p19
    }
    const IndentidadInstitucional = {
        id_alumno: id,
        Pregunta_20: p20,
        Pregunta_21: p21
    };
    await pool.query('INSERT INTO desempeñoDocente set ?', [DesempeñoDocente]);
    await pool.query('INSERT INTO desempeñoEstudiantil set ?', [DesempeñoEstudiantil]);
    await pool.query('INSERT INTO identidadInstitucional set ?', [IndentidadInstitucional]);

    if(id === undefined){
        req.logOut();
        req.flash('message','ocurrio un error ingresa de nuevo por favor');
        res.redirect('/login');
    }
    else {
        req.logOut();
        req.flash('success','Respuestas enviadas Exitosamente');
        res.redirect('/login');
    }    
});


module.exports = router;