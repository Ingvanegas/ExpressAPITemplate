const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = {
    nombre: String,
    idRegion: String,
}

module.exports.model = mongoose.model('Paises', schema);
