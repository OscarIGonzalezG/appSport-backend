// este archivo define el modelo de usuario para la base de datos

// se importa mongoose para poder definir el esquema de usuario
const mongoose = require('mongoose');

// se define el esquema de usuario con los campos username, email y password
const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' }, // <- aquí
});

// este es el modelo de usuario que se va a utilizar para la base de datos
module.exports = mongoose.model('User', userSchema);

