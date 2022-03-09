const express = require('express');
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const favicon = require('serve-favicon');

//initializations
const app = express();
require('./lib/passport');

//settings
app.use(favicon(path.join(__dirname, './favicon.ico')));
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));

var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
});

app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');

 
//Middlewares
app.use(session({
    secret: 'Rosewall',
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use(require('./routes/answers'));
app.use(require('./routes/materias'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
}
);