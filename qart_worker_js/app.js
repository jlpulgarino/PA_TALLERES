var async = require("async");
var express = require("express"),
    app = express(),
	http     = require("http"),
	server   = http.createServer(app),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.getterFromPost = function(req) {
    function get(atributos, mensajeDeFallo) {
        var arregloAtributos = atributos.split(".");
        var valor = req.body;
        for (var i = 0; i < arregloAtributos.length; i++) {
            valor = valor[arregloAtributos[i]];
        }

        if (mensajeDeFallo) {
            if (valor === null || valor === "" || typeof valor === "undefined") {
                var err = new Error(mensajeDeFallo);
                err.status = 400;
                throw err;
            }
        }
        return valor;
    }
    return {
        get: get
    };

};


// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
    console.log('Queue ['+ q.length() +'] ... ' + task.name);
    callback();
}, 1);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
};


var router = express.Router();
var hasEmulator = 0;

router.get('/', function(req, res) {
   res.send("Hello World!");
});

router.post('/e2e/', function(req, res) {

    var data = app.getterFromPost(req);
    var stepInstance = {
        instance: data.get('instance'),
        job: data.get('job'),
        step: data.get('step'),
        type: data.get('type'),
        path: data.get('path'),
		status: 'PND'
    };

			q.push({name: req.params.instance}, function(err) {
					console.log('start e2e testing process instance '+ stepInstance.instance);
					console.log('hasEmulator = '+hasEmulator);
					if(hasEmulator == 0){
						console.log('starting emulator...');
						const { spawn } = require('child_process');
						const bat = spawn('cmd.exe', ['/c', 'start cmd /k startemulator.bat']);
						hasEmulator = 1;
						var outTxt = ''
						var errTxt = ''
						
						bat.stdout.on('data', (data) => {
						  outTxt = outTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.stderr.on('data', (data) => {
						  errTxt = errTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.on('exit', (code) => {
						  console.log(`Child exited with code ${code}`);
						});
					}else{
						console.log('emulator started...');
					}


				});

		setTimeout(function() {
			q.push({name: req.params.instance}, function(err) {
				console.log('start testing e2e '+stepInstance.instance);
				
				const { spawn } = require('child_process');
				const bat = spawn('cmd.exe', ['/c', 'start_e2e.bat']);
				var outTxt = ''
				var errTxt = ''
				
				bat.stdout.on('data', (data) => {
				  outTxt = outTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.stderr.on('data', (data) => {
				  errTxt = errTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.on('exit', (code) => {
				  console.log(`Child exited with code ${code}`);
				  console.log(' errTxt : '+errTxt);
				  console.log(' outTxt : '+outTxt);
				});
		});
		}, 30000);
				
				

	stepInstance.status = 'OK';
	res.send(stepInstance);
	

});

router.post('/monkey/', function(req, res) {

    var data = app.getterFromPost(req);
    var stepInstance = {
        instance: data.get('instance'),
        job: data.get('job'),
        step: data.get('step'),
        type: data.get('type'),
        path: data.get('path'),
		status: 'PND'
    };

			q.push({name: req.params.instance}, function(err) {
					console.log('start monkey testing process instance '+ stepInstance.instance);
					console.log('hasEmulator = '+hasEmulator);
					if(hasEmulator == 0){
						console.log('starting emulator...');
						const { spawn } = require('child_process');
						const bat = spawn('cmd.exe', ['/c', 'start cmd /k startemulator.bat']);
						hasEmulator = 1;
						var outTxt = ''
						var errTxt = ''
						
						bat.stdout.on('data', (data) => {
						  outTxt = outTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.stderr.on('data', (data) => {
						  errTxt = errTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.on('exit', (code) => {
						  console.log(`Child exited with code ${code}`);
						});
					}else{
						console.log('emulator started...');
					}


				});

		setTimeout(function() {
			q.push({name: req.params.instance}, function(err) {
				console.log('start testing monkey '+stepInstance.instance);
				
				const { spawn } = require('child_process');
				const bat = spawn('cmd.exe', ['/c', 'start_monkey.bat']);
				var outTxt = ''
				var errTxt = ''
				
				bat.stdout.on('data', (data) => {
				  outTxt = outTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.stderr.on('data', (data) => {
				  errTxt = errTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.on('exit', (code) => {
				  console.log(`Child exited with code ${code}`);
				  console.log(' errTxt : '+errTxt);
				  console.log(' outTxt : '+outTxt);
				});
		});
		}, 30000);
				
				

	stepInstance.status = 'OK';
	res.send(stepInstance);
	

});


router.get('/e2e/:instance', function(req, res) {

    //var data = app.getterFromPost(req);
    var stepInstance = {
        instance: req.params.instance,
        job: 1,
        step: 1,
        type: 'E2E',
        path: '',
		status: 'PND'
    };

			q.push({name: req.params.instance}, function(err) {
					console.log('start e2e testing process instance '+ stepInstance.instance);
					console.log('hasEmulator = '+hasEmulator);
					if(hasEmulator == 0){
						console.log('starting emulator...');
						const { spawn } = require('child_process');
						const bat = spawn('cmd.exe', ['/c', 'start cmd /k startemulator.bat']);
						hasEmulator = 1;
						var outTxt = ''
						var errTxt = ''
						
						bat.stdout.on('data', (data) => {
						  outTxt = outTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.stderr.on('data', (data) => {
						  errTxt = errTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.on('exit', (code) => {
						  console.log(`Child exited with code ${code}`);
						});
					}else{
						console.log('emulator started...');
					}


				});

		setTimeout(function() {
			q.push({name: req.params.instance}, function(err) {
				console.log('start testing e2e '+stepInstance.instance);
				
				const { spawn } = require('child_process');
				const bat = spawn('cmd.exe', ['/c', 'start_e2e.bat']);
				var outTxt = ''
				var errTxt = ''
				
				bat.stdout.on('data', (data) => {
				  outTxt = outTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.stderr.on('data', (data) => {
				  errTxt = errTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.on('exit', (code) => {
				  console.log(`Child exited with code ${code}`);
				  console.log(' errTxt : '+errTxt);
				  console.log(' outTxt : '+outTxt);
				});
		});
		}, 30000);
				
				

	stepInstance.status = 'OK';
	res.send(stepInstance);
	

});

router.get('/monkey/:instance', function(req, res) {

    //var data = app.getterFromPost(req);
    var stepInstance = {
        instance: req.params.instance,
        job: 1,
        step: 1,
        type: 'RMT',
        path: '',
		status: 'PND'
    };

			q.push({name: req.params.instance}, function(err) {
					console.log('start monkey testing process instance '+ stepInstance.instance);
					console.log('hasEmulator = '+hasEmulator);
					if(hasEmulator == 0){
						console.log('starting emulator...');
						const { spawn } = require('child_process');
						const bat = spawn('cmd.exe', ['/c', 'start cmd /k startemulator.bat']);
						hasEmulator = 1;
						var outTxt = ''
						var errTxt = ''
						
						bat.stdout.on('data', (data) => {
						  outTxt = outTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.stderr.on('data', (data) => {
						  errTxt = errTxt + data.toString()
						  //console.log(data.toString());
						});

						bat.on('exit', (code) => {
						  console.log(`Child exited with code ${code}`);
						});
					}else{
						console.log('emulator started...');
					}


				});

		setTimeout(function() {
			q.push({name: req.params.instance}, function(err) {
				console.log('start testing monkey '+stepInstance.instance);
				
				const { spawn } = require('child_process');
				const bat = spawn('cmd.exe', ['/c', 'start_monkey.bat']);
				var outTxt = ''
				var errTxt = ''
				
				bat.stdout.on('data', (data) => {
				  outTxt = outTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.stderr.on('data', (data) => {
				  errTxt = errTxt + data.toString()
				  //console.log(data.toString());
				});

				bat.on('exit', (code) => {
				  console.log(`Child exited with code ${code}`);
				  console.log(' errTxt : '+errTxt);
				  console.log(' outTxt : '+outTxt);
				});
		});
		}, 30000);
				
				

	stepInstance.status = 'OK';
	res.send(stepInstance);
	

});

app.use(router);


app.listen(3001, function() {
	
	// add some items to the queue
	q.push({name: 'foo'}, function(err) {
		/*
		const { spawn } = require('child_process');
		const bat = spawn('cmd.exe', ['/c', 'losEstudiantes.bat']);
		
		bat.stdout.on('data', (data) => {
		  console.log(data.toString());
		});

		bat.stderr.on('data', (data) => {
		  console.log(data.toString());
		});

		bat.on('exit', (code) => {
		  console.log(`Child exited with code ${code}`);
		});
		*/
	console.log('finished processing foo');
	});
	q.push({name: 'bar'}, function (err) {
		console.log('finished processing bar');
	});

	// add some items to the queue (batch-wise)
	q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
		console.log('finished processing item');
	});

	// add some items to the front of the queue
	q.unshift({name: 'bar'}, function (err) {
		console.log('finished processing bar');
	});
	
  console.log("Node server running on http://localhost:3000");
});