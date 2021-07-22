const express = require('express');
const  morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
//Inicializacion

const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),  'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variales globales
app.use((req,res,next) =>{
    next();
});

//Rutas
app.use(require("./routes"));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//Archivos publicos

app.use(express.static(path.join(__dirname, 'public')));

//Iniciar el servidor
app.listen(app.get('port'), ()=>{
    console.log("Servidor ejecutandose")
});
