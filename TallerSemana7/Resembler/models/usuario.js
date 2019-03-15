var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
  nombre:    { type: String },
  apellido:     { type: String },
  documento:  { type: String },
  login:   { type: String },
  email:  { type: String }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
