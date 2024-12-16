const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { ensureAuthenticated } = require('./middlewares/auth');

// initialization
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')); // los formularios también pueden enviar put o delete
app.use(session({
    secret: 'mysecreteapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(cookieParser());

// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/publications'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// mongo connection
mongoose.connect('mongodb://localhost:27017/project-pw')
.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));

// server initialization
app.listen(app.get('port'), () => {
    console.log('Servidor conectado al puerto ', app.get('port'));
})