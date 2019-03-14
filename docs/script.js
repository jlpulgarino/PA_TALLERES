function randomPalette(){
	var step = (Math.floor(Math.random() * 11)+1)*5;
	var init = (Math.floor(Math.random() * (358-(5*step))))+1;
	return [init,step]
}



function generateRules(){
	var hexColor = rgbToHex(255, 0, 0);
	var init = 0;
	var randHue = randomPalette();
	var hexValues = [];
	for(var i = 0 ; i < 5; i++){
		var hueValue = (randHue[0]+(randHue[1]*i))/360;
		//alert(hueValue);
		var rgbColor = hsvToRgb(hueValue, 1, 1);
		var hexValue = rgbToHex(Math.floor(rgbColor[0]), Math.floor(rgbColor[1]), Math.floor(rgbColor[2]));
		hexValues.push(hexValue);
		document.getElementById("color"+(i+1)).style.background =  hexValue;
	}
	document.getElementById("css-rules").value = "\n.website-background{ color: "+hexValues[0]+";}\n\n";
	document.getElementById("css-rules").value += ".element-text{ color: "+hexValues[1]+";}\n\n";
	document.getElementById("css-rules").value += ".element-border{ color: "+hexValues[2]+";}\n\n";
	document.getElementById("css-rules").value += ".element-background{ color: "+hexValues[3]+";}\n\n";
	document.getElementById("css-rules").value += ".header{ color: "+hexValues[4]+";}\n\n";
}


function cleanRules(){
	var hexValue = "#FFFFFF"
	for(var i = 0 ; i < 5; i++){
		document.getElementById("color"+(i+1)).style.background =  hexValue;
	}
	document.getElementById("css-rules").value = "\n.website-background{ color: "+hexValue+";}\n\n";
	document.getElementById("css-rules").value += ".element-text{ color: "+hexValue+";}\n\n";
	document.getElementById("css-rules").value += ".element-border{ color: "+hexValue+";}\n\n";
	document.getElementById("css-rules").value += ".element-background{ color: "+hexValue+";}\n\n";
	document.getElementById("css-rules").value += ".header{ color: "+hexValue+";}\n\n";


}
