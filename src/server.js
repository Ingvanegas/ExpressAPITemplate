var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require('express-rate-limit');
var authentication = require('./authentication');
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var actions = require('./database/actions/actions');

var swaggerDefinition = require('./swaggerDefinitons');

//models
var usuariosModel = require('./models/usuariosModel');

// Routers of our database
var users = require('./routes/users');
var orders = require('./routes/orders');
var regiones = require('./routes/regiones');
var paises = require('./routes/paises');
var ciudades = require('./routes/ciudades');

var apiLimiterLogin = rateLimit({
    max: 100
});

var port = 3001;

const options = {
    ...swaggerDefinition,
    apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsDoc(options);

var server = express();

server.use(helmet());
server.use(bodyParser());
server.use('/', apiLimiterLogin);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use('/', users);
server.use('/', orders);
server.use('/', regiones);
server.use('/', paises);
server.use('/', ciudades);

server.get('/', (req, res) => {
    res.send('Bienvenidos a mi api de express');
});

server.get('/api-docs.json', (req, res) => {
    res.send(swaggerSpec);
});

server.post('/login', async (req, res) => {
    var arg = req.body;
    var email = arg.email;
    var contrasena = arg.contrasena;
    const usuarios = await actions.get(usuariosModel.model, { email, contrasena })
    if(usuarios.length > 0) {
        var data = { email, contrasena, perfil: usuarios[0].perfil };
        var token = authentication.generateToken(data);
        res.send({
            result: 'OK',
            role: usuarios[0].Type,
            token
        });
    }else {
        res.send({
            result: 'ERROR'
        });
    }
});

server.listen(port, () =>{
    console.log(`servidor corriendo en el puerto ${port}`);
});