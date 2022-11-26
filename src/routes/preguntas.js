const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.post('/preguntas', isLoggedIn, async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        req.flash('message', 'Favor de seleccionar al menos una materia');
        res.redirect('/materias');
    }
    else {
        const materiasCursadas = req.body; 

        var Preguntas = {};
        var str = "select id_Pregunta, Pregunta " +
            "from Preguntas where id_Type = 1";
            
        var consulta = await pool.query(str);

        Preguntas['Desempeño Docente'] = {};
    
        consulta.forEach(reg => {
            Preguntas['Desempeño Docente'][reg.id_Pregunta] = [reg.Pregunta];
        });
        
        str = "select id_Pregunta, Pregunta " +
            "from Preguntas where id_Type = 2";
            
        consulta = await pool.query(str);

        Preguntas['Desempeño Estudiantil'] = {};
    
        consulta.forEach(reg => {
            Preguntas['Desempeño Estudiantil'][reg.id_Pregunta] = [reg.Pregunta];
        });

        req.flash('success', 'Favor de responder las siguientes preguntas');
        res.render('questions/answers', { Preguntas, materiasCursadas });
    }
});


module.exports = router;
