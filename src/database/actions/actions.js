const mongoose = require('mongoose');
const { model } = require('../../models/usuariosModel');
mongoose.connect('mongodb://localhost:27017/warehouse');

module.exports.get = async (model, parameters) => {
    return model.find(parameters);
}

module.exports.create = async (model, data) => {
    const newObject = new model(data)
	const result = await newObject.save();
    return result;
}

module.exports.update = async (model, id, data) => {
  return await model.findByIdAndUpdate(id, data)
}

module.exports.delete = async (model, id, data) => {
    return await model.findByIdAndDelete(id, data)
}
