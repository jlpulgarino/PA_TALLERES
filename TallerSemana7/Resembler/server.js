var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');
    //var MongoClient = require('mongodb').MongoClient;

    var usuarioCtrl = require('./controllers/usuarios');
    var vrtCtrl = require('./controllers/resembleTest');

    // API routes
    var usuarioRtr = express.Router();
    var vrtRtr = express.Router();

    usuarioRtr.route('/usuarios')
      .get(usuarioCtrl.findAllUsuarios);
      //.post(usuarioCtrl.addTVShow);

    usuarioRtr.route('/usuario/:id')
      .get(usuarioCtrl.findById);
      //.put(usuarioCtrl.updateTVShow)
      //.delete(usuarioCtrl.deleteTVShow);

    app.use('/api', usuarioRtr);

	
    vrtRtr.route('/compare')
      .get(vrtCtrl.getDiff);

    vrtRtr.route('/compare/:id/:file1/:file2')
      .get(vrtCtrl.getDiff2);

	  vrtRtr.route('/analisis')
      .get(vrtCtrl.getAnalisis);
      //.put(usuarioCtrl.updateTVShow)
      //.delete(usuarioCtrl.deleteTVShow);

    app.use('/resembler', vrtRtr);
	
	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
/*
mongoose.connect('mongodb://localhost:27017/usuarios', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
*/
