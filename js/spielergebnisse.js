function buttonStartErgebnisse () {	
	//***********************//
	// ERGEBNIS VAR   //
	//***********************//
	var ergebnisMap = new Map();
	var anzErgebnis = 0;
	for(var i = 1; i <= 8; i++){
		var ergebnis = getErgebnis(i);
		// Ergebnisse werden nur mitgenommen wenn auch alles ausgefüllt ist
		if(ergebnis.spiel && ergebnis.team && ergebnis.ergebnisLES && ergebnis.ergebnisGegner && ergebnis.teamGegner){
			var ergebnisListe = ergebnisMap.get(ergebnis.spiel);
			if(ergebnisListe == null){
				ergebnisListe = [];
			}
			ergebnisListe.push(ergebnis);
			ergebnisMap.set(ergebnis.spiel, ergebnisListe);
			anzErgebnis++;
		}
	}
	var anzBalken = ergebnisMap.length;
	var grErgebnis = 100;
	var y_start = 218;
	var balken_breite = 4;
	var balken_versatz = 5;
	
	//***********************//
	// SONSTIGE VAR    //
	//***********************//
	var kw = document.getElementById("kw").value;		
	var jahr = document.getElementById("jahr").value;
	var c=document.getElementById("canvasErgebnis");
	var ctx=c.getContext("2d");
	
	var hintergrund = new Image();
	hintergrund.src = "bilder/hintergrund.png";	
	hintergrund.onload;
	//***********************//
	// HINTERGRUND     //
	//***********************//
	c.height = hintergrund.height;
	c.width = hintergrund.width;
	ctx.drawImage(hintergrund, 0, 0, hintergrund.width, hintergrund.height);
			
	//***********************//
	// KALENDERWOCHE //
	//***********************//
	ctx.font = "43px Titillium Web";
	ctx.fillStyle = "white";
	kw = "KW " + kw;
	var kw_breite = ctx.measureText(kw).width;
	ctx.fillText(kw, hintergrund.width - 150 - kw_breite, 49);
	ctx.fillText(jahr, hintergrund.width - 117, 49);

	var logo_height = 80;
	var x_start = 41;
	var anzSpiele = ergebnisMap.size;
	var x1_balken = 220;
	var x2_balken = 1881;
	var x = x1_balken + (x2_balken - x1_balken)/2;
	var abstand = hintergrund.height - y_start;
	abstand = abstand - (anzSpiele * balken_breite);
	abstand = abstand - (anzErgebnis * grErgebnis);
	abstand = abstand / (anzErgebnis + 2);
	y_start = y_start + abstand;
	abstand = abstand + grErgebnis;
	for (var spiel of ergebnisMap.values()) {
		//***********************//
		// BALKEN               //
		//***********************//
		ctx.fillStyle = "#FFD129";
		ctx.beginPath();
		ctx.moveTo(x1_balken, y_start);
		ctx.lineTo(x2_balken, y_start);
		ctx.lineTo(x2_balken - balken_versatz, y_start + balken_breite);
		ctx.lineTo(x1_balken - balken_versatz, y_start + balken_breite);
		ctx.closePath();
		ctx.fill();		
		
		//***********************//
		// BALKEN               //
		//***********************//
		var ergebnis = spiel[0];
		var logo = new Image();
		logo.src = "bilder/" + ergebnis.spiel + "_logo.png";
		logo.onload;
		var logo_width = (logo_height / logo.height) * logo.width;
		var logo_start = x1_balken/2 - logo_width/2;
		ctx.drawImage(logo, logo_start, y_start, logo_width, logo_height);
		//***********************//
		// TEXT                    //
		//***********************//
		for (var i = 0; i<spiel.length;i++){
			ergebnis = spiel[i];
			ctx.font = grErgebnis + "px Titillium Web";
			ctx.fillStyle = "white";
			ctx.fillText(":", x, y_start+90);

			var textLength = ctx.measureText(ergebnis.ergebnisLES).width;
			ctx.fillText(ergebnis.ergebnisLES, x-5-textLength, y_start+90);
			ctx.fillText(ergebnis.ergebnisGegner, x+25, y_start+90);		

			ctx.font = "58px Titillium Web";
			textLength = ctx.measureText("LESeV " + ergebnis.team).width;
			ctx.fillText("LESeV " + ergebnis.team, x-textLength-150, y_start+79);
			ctx.fillText(ergebnis.teamGegner, x+150, y_start+79);	
			y_start = y_start + abstand;
		}
	}  
	document.getElementById("ausgabeErgebnisse").innerHTML = "Erfolg! Jetzt nur noch<br/>Rechtsklick > Bild speichern unter...<br/> klicken.";
}

function getErgebnis(zahl){
	var spiel = document.getElementById("spiel" + zahl).value;
	var team = document.getElementById("team" + zahl).value;
	var ergebnisLES = document.getElementById("ergebnisLES" + zahl).value;
	var ergebnisGegner = document.getElementById("ergebnisGegner" + zahl).value;
	var teamGegner = document.getElementById("teamGegner" + zahl).value;
    return { spiel: spiel, team: team, ergebnisLES: ergebnisLES, ergebnisGegner: ergebnisGegner, teamGegner: teamGegner};
}