const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const { crypt, match } = require('../lib/helpers');

passport.use('login', new LocalStrategy({
    usernameField: 'No_cuenta',
    passwordField: 'No_cuenta',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const { Nombre_Completo } = req.body;
    const newUser = {
        No_Cuenta: username,
        password,
        Nombre_Completo
    };

    const rows = await pool.query("select * from alumnos where No_Cuenta = " + username);

    if (rows.length > 0) {

        const rows = await pool.query("select * from alumnos where No_Cuenta = " + username + " AND Nombre_Completo = '" + newUser.Nombre_Completo + "'");

        if (rows.length > 0) {
            const user = rows[0];
            const ban = await match(password, user.password);
            if (ban) {
                req.session.id = user.id;
                return done(null, user, req.flash('success', 'Favor de seleccionar las materias que estas tomando en el semestre en curso'));
            } else {
                console.log('error');
                return done(null, false, req.flash('message', 'Ocurrió un error al ingresar'));
            }
        }

        else {
            console.log('error');
            return done(null, false, req.flash('message', 'El nombre no coincide con el numero de cuenta registrado, Favor de hablar con el encargado si existe algún inconveniente'));
        }

    }
    else {
        newUser.password = await crypt(password);
        const result = await pool.query('INSERT INTO alumnos SET ?', [newUser]);
        newUser.id = result.insertId;
        req.session.id = newUser.id;
        return done(null, newUser, req.flash('success', 'Favor de resporder el siguiente cuestionario'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    pool.query("select * from alumnos where id = " + id, function (err, rows) {
        done(err, rows[0]);
    });
});
