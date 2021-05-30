var express = require('express');
var router = express.Router();
var actions = require('../database/actions/actions');
var authentication = require('../authentication');
var regionesModel = require('../models/regionesModel');

router.get('/regiones', authentication.verifyUser, async (req, res) => {
    const regiones = await actions.get(regionesModel.model);
    res.send(regiones);
});

router.post('/region', authentication.verifyUser, async (req, res) => {
    const region = await actions.create(
        regionesModel.model, 
        req.body);
        res.send(region);
});

router.put('/something', authentication.verifyUser, async (req, res) => {
    // code here
});

router.delete('/something', authentication.verifyUser, async (req, res) => {
    // code here
});

module.exports = router;