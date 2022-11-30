const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');
const { crypt, match } = require('../lib/helpers');

passport.use('login', new LocalStrategy({
    usernameField: 'Cuenta',
    passwordField: 'Cuenta',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const { Nombre, id_Carrera } = req.body;
    const newUser = {
        id: username,
        Cuenta: username,
        password,
        Nombre,
        id_Carrera
    };

    const rows = await pool.query("select * from Alumnos where Cuenta = " + username);

    if (Nombre.split(' ').length < 3) {
        console.log('error');
        return done(null, false, req.flash('message', 'Favor de Ingresar tu nombre completo'));
    }
    else if (rows.length > 0) {
        const rows = await pool.query("select * from Alumnos where Cuenta = " + username + " and Nombre = '" + newUser.Nombre + "'" + " and id_Carrera = '" + newUser.id_Carrera + "'");

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
            return done(null, false, req.flash('message', ['Los datos proporcionados no coinciden con el numero de cuenta registrado', 'Favor de hablar con el encargado si existe algún inconveniente']));
        }

    }
    else {
        newUser.password = await helpers.crypt(password);
        const result = await pool.query('INSERT INTO Alumnos SET ?', [newUser]);
        newUser.id = result.insertId;
        req.session.id = newUser.id;
        return done(null, newUser, req.flash('success', 'Favor de resporder el siguiente cuestionario'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const rows = await pool.query('select * from Alumnos where id = ?', [id]);
        if (rows.length == 0){ 
            throw new Error('User not Found');
        }
        done(null, rows[0]);
    } catch (err) {
        const idDefault = 0000000;
        const rows = await pool.query('select * from Alumnos where id = ?', [idDefault]);
        done(null, rows[0]);
    }
});
