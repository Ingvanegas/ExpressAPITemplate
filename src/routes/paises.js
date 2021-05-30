var express = require('express');
var router = express.Router();
var actions = require('../database/actions/actions');
var authentication = require('../authentication');
var paisesModel = require('../models/paisesModel');

router.get('/paises', authentication.verifyUser, async (req, res) => {
    const paises = await paisesModel.model.aggregate([
        {
            "$lookup": {
                "from": "regiones",
                "localField": "idRegion",
                "foreignField": "_id",
                "as": "region"
            }
        }
    ]).exec()
    res.send(paises);
});

router.post('/pais', authentication.verifyUser, async (req, res) => {
    const pais = await actions.create(
        paisesModel.model, 
        req.body);
        res.send(pais);
});

router.put('/something', authentication.verifyUser, async (req, res) => {
    // code here
});

router.delete('/something', authentication.verifyUser, async (req, res) => {
    // code here
});

module.exports = router;