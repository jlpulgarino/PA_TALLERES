//var mongoose = require('mongoose');
require('../models/usuario');
//var Usuario  = mongoose.model('Usuario');

//GET - Return all usuarios in the DB
exports.findAllUsuarios = function(req, res) {
	console.log('GET /usuarios');
	var usuarios = [];
	var usuario1 = {
		nombre: 'Usuario 1',
		id: '000000001'
	}
	var usuario2 = {
		nombre: 'Usuario 2',
		id: '000000002'
	}
usuarios.push(usuario1);
usuarios.push(usuario2);

	res.status(200).jsonp(usuarios);
};

//GET - Return a usuario with specified ID
exports.findById = function(req, res) {
  var usuario = {};
	var usuario1 = {
		nombre: 'Usuario 1',
		id: '000000001'
	}
	var usuario2 = {
		nombre: 'Usuario 2',
		id: '000000002'
	}

 if(req.params.id == '000000001'){
	 usuario = usuario1;
 }else{
	 usuario = usuario2;
 }

	console.log('GET /usuario/' + req.params.id);
	res.status(200).jsonp(usuario);

};
