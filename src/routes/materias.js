const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/materias', isLoggedIn, async (req, res) => {
    const carrera = req.user.id_Carrera;
    var materias = {};
    for (var sem = 1; sem < 11; sem++) {
        const str = "select id_Materia, Nombre " +
        "from Materias where id_Carrera = '" + carrera + "'"  + " AND Semestre = " + sem;
        
        const consulta = await pool.query(str);
            materias[sem] = {};

        consulta.forEach(reg => {
            materias[sem][reg.id_Materia] = [reg.Nombre];
        });
    }

    res.render('questions/materias', { materias });
});


module.exports = router;