const mongoose = require('mongoose');

const schema = {
    nombre: String,
    idPais: String
}

module.exports.model = mongoose.model('Ciudades', schema);
