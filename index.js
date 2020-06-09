const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const http = require('http');
const https = require('https');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const engine = require('ejs-blocks');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// Carga de los ficheros con los certificados de Let's Encrypt
const privateKey = fs.readFileSync('/etc/letsencrypt/live/naevus.giize.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/naevus.giize.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/naevus.giize.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session
    ({
    secret:'hduiahsd87TD87gd87DG87GD8dg9psfgaf',
    resave:true,
    name: "naevus_cookie",
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge:1000*60*15, // 15 minutos de inactividad
        sameSite: true,
    },
    rolling: true // Para que se renueve la caducidad en cada petición
    })
);

// Motor de plantillas de la aplicación
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Rutas estáticas de la aplicación
app.use(express.static(path.join(__dirname, 'public')));

const clientConnected = (req,res,next) =>
{
    client = req.session.client || null;
    if(client == null)
    {
        req.session.client = {};
        req.session.client.login = false;
    }
    next();
};

// Cada vez que cargu una ruta (una página) se ejecutará este código
app.use(clientConnected);

// Ruta de la API
const web = require('./routes/web.route');
const user = require('./routes/user.route');
const project = require('./routes/project.route');
app.use('/', web);
app.use('/', user);
app.use('/', project);

// Creamos el servidor http como https:
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.HTTP_PORT, () => {
    console.log('HTTP server working on port  ' + process.env.HTTP_PORT);
});

httpsServer.listen(process.env.HTTPS_PORT, () => {
    console.log('HTTPS server working on port ' + process.env.HTTPS_PORT);
});