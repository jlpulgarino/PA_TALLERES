//var mongoose = require('mongoose');
//const compareImages = require("resemblejs/compareImages");
var fs = require("mz/fs");
var resemble = require("node-resemble-js");


//GET - Compare Images
exports.getDiff = async function(req, res) {
	console.log('GET /Compareimages');

	var options = {
			output: {
				errorColor: {
					red: 255,
					green: 0,
					blue: 255
				},
				errorType: "movement",
				transparency: 0.3,
				largeImageThreshold: 1200,
				useCrossOrigin: false,
				outputDiff: true
			},
			scaleToSameSize: true,
			ignore: "antialiasing"
		};

	var f1 = await fs.readFile("./screenshots/fotofabis.png");
	var f2 = await fs.readFile("./screenshots/fotofabis2.png");

	var diff = await resemble(f1).compareTo(f2).ignoreColors().onComplete(function(data){
			console.log(data);
			fs.writeFile("./resultVRT/output.jpg", data.getDiffImageAsJPEG());
			res.status(200).jsonp(data);
			/*
			{
			  misMatchPercentage : 100, // %
			  isSameDimensions: true, // or false
			  dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
			  getImageDataUrl: function(){}
			}
			*/
	});
	


};

//POST - Compare Images
exports.getDiff2 = async function(req, res) {
	console.log('POST /Compareimages');
	var Id = req.params.id;
	var File1 = req.params.file1;
	var File2 = req.params.file2;

	var options = {
			output: {
				errorColor: {
					red: 255,
					green: 0,
					blue: 255
				},
				errorType: "movement",
				transparency: 0.3,
				largeImageThreshold: 1200,
				useCrossOrigin: false,
				outputDiff: true
			},
			scaleToSameSize: true,
			ignore: "antialiasing"
		};

	var f1 = await fs.readFile("./screenshots/"+File1);
	var f2 = await fs.readFile("./screenshots/"+File2);

	var diff = await resemble(f1).compareTo(f2).ignoreColors().onComplete(function(data){
			console.log(data);
			fs.writeFile("./resultVRT/"+Id+".jpg", data.getDiffImageAsJPEG());
			res.status(200).jsonp(data);
	});

	//res.status(200).jsonp("{status:'OK'}");


};

exports.getAnalisis = async function(req, res){
	
	var f1 = await fs.readFile("./screenshots/NavegacionAdm.png");
	var api = await resemble(f1).onComplete(function(data){
		console.log(data);
		res.status(200).jsonp(data);
	})

	//res.status(200).jsonp(api);

};

