const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.post('/institucion', isLoggedIn, async (req, res) => {

    if (req.user.id === undefined) {
        req.logOut();
        req.flash('message', 'ocurrio un error ingresa de nuevo por favor');
        res.redirect('/login');
        req.session.destroy();
    }
    else {
        const aux = JSON.parse(JSON.stringify(req.body));
        const keys = Object.keys(aux);

        var formatResp = {};

        keys.forEach(key => {
            const pregunta = key.split(' ')[0];
            const materia = key.split(' ')[1];

            if (formatResp[materia] === undefined) formatResp[materia] = {}
            formatResp[materia][pregunta] = aux[key];
        });

        respuestas = {
            'DsmpDcnte': {},
            'DsmpEstdtl': {}
        };

        Object.keys(formatResp).forEach(async reg => {

            var RespDcnte = 'INSERT INTO RespDsmpDcnte values (0, ' + req.user.id + ', ' + reg + ', ';
            var RespEstdtl = 'INSERT INTO RespDsmpEstdtl values (0, ' + req.user.id + ', ' + reg + ', ';

            Object.keys(formatResp[reg]).forEach(resp => {
                const strResp = (resp >= 1 && resp < 30) || (resp >= 31 && resp < 40) ? formatResp[reg][resp] + ', ' : formatResp[reg][resp] + ');';

                RespDcnte = resp <= 30 ? RespDcnte + strResp : RespDcnte;
                RespEstdtl = resp > 30 ? RespEstdtl + strResp : RespEstdtl;

            });

            await pool.query(RespDcnte);
            await pool.query(RespEstdtl);

        });


        var str = "select id_Pregunta, Pregunta " +
            "from Preguntas where id_Type = 3";

        var consulta = await pool.query(str);

        var identidadInstitucional = {};

        consulta.forEach(reg => {
            identidadInstitucional[reg.id_Pregunta] = [reg.Pregunta];
        });

        res.render('questions/recomendacion', { identidadInstitucional });
    }

});


module.exports = router;
