var express = require('express');
var router = express.Router();
var actions = require('../database/actions/actions');
var authentication = require('../authentication');
var ciudadesModel = require('../models/ciudadesModel');

router.get('/ciudades', authentication.verifyUser, async (req, res) => {
    const ciudades = await actions.get(ciudadesModel.model);
    res.send(ciudades);
});

router.post('/ciudad', authentication.verifyUser, async (req, res) => {
    const ciudad = await actions.create(
        ciudadesModel.model, 
        req.body);
        res.send(ciudad);
});

router.put('/something', authentication.verifyUser, async (req, res) => {
    // code here
});

router.delete('/something', authentication.verifyUser, async (req, res) => {
    // code here
});

module.exports = router;