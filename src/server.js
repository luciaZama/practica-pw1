const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const dotenv = require("dotenv");

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
dotenv.config();

// middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// global variables

// routes
app.use(require('./routes/index'));
app.use(require('./routes/publications'));
app.use(require('./routes/users'));

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