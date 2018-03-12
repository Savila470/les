function buttonStartBildverarbeitung () {
	var ausrichtung = document.getElementById("ausrichtung").value;	
	var transparenz = document.getElementById("transparenz").value;
	var balken = document.getElementById("balken").checked;
	var art = document.getElementById("art").value;
	var verkleinerung = 6;	
	if(art = "logo"){
		verkleinerung = 8;
	}
 	
	var c=document.getElementById("canvasVerarb");
	var ctx=c.getContext("2d");
	
	//*********************************************//
	// Ab hier wird das BILD gemalt        //
	//*********************************************//	
	var bild = document.getElementById('vorschau_bild');
	c.height = bild.height;
	c.width = bild.width;
	ctx.drawImage(bild, 0, 0, bild.width, bild.height);					
	
	//*********************************************//
	// Ab hier wird das LOGO gemalt        //
	//*********************************************//
	var logo = new Image();
	logo.src = getLogoPfad();	
	logo.onload = function(){	
		var logo_height = bild.height / verkleinerung;
		var divisor = logo_height / logo.height;
		var logo_width = logo.width * divisor;
		var RAND = logo_height * 0.3;
		var logo_x = 0;
		var logo_y = 0;

		switch (ausrichtung) {
			case "lu":
				logo_y = bild.height - (logo_height + RAND);
				logo_x = RAND;
				break;
			case "lo":
				logo_y = RAND;
				logo_x = RAND;
				break;
			case "ro":
				logo_y = RAND;
				logo_x = bild.width - (logo_width + RAND);
				break;
			case "ru":
				logo_y = bild.height - (logo_height + RAND);
				logo_x = bild.width - (logo_width + RAND);
				break;
			default:
				break;
		} 
		ctx.globalAlpha = transparenz;
		ctx.drawImage(logo, logo_x, logo_y, logo_width, logo_height);
		
		//*********************************************//
		// Ab hier wird der BALKEN gemalt        //
		//*********************************************//		
		if(balken){	
			// Konstanten
			var winkel = 0;
			var logo_faktor = 0.5;
			// Werte in Abhängigkeit
			var streifen_breite = logo_height * 0.13 ;
			var streifen_ausrichtung = streifen_breite * 2;
			// Start- und Endpunkte
			var x1 = RAND + logo_height * logo_faktor;
			var y1 = -streifen_ausrichtung;
			var x2 = -streifen_ausrichtung;	
			var y2 = x1 * Math.cos(Math.PI * winkel / 180.0);
			
			switch (ausrichtung) {
				case "ro":			
					x1 = bild.width - x1;
					x2 = bild.width + streifen_ausrichtung;
					break;
				case "lu":
					y2 = bild.height - y2;
					y1 = bild.height + streifen_ausrichtung;
					break;
				case "ru":
					x1 = bild.width - x1;
					y2 = bild.height - y2;
					y1 = bild.height + streifen_ausrichtung;
					x2 = bild.width + streifen_ausrichtung;
					break;
				default:	
					break;
			} 
			
			ctx.globalAlpha = transparenz;
			ctx.beginPath();
			ctx.lineWidth=streifen_breite;
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.strokeStyle = getBalkenColor();
			ctx.stroke();
		}
	}
	
	bild.style.display = "none";
	document.getElementById("ausgabe").innerHTML = "Erfolg! Jetzt nur noch<br/>Rechtsklick > Bild speichern unter...<br/> klicken.";
};

function getLogoPfad(){
	var art = document.getElementById("art").value;	
	var farbe = document.getElementById("farbe").value;
	return "bilder/" + art + "_" + farbe + ".svg";
}

function getBalkenColor(){
	var farbe = document.getElementById("farbe").value;
	var art = document.getElementById("art").value;
	switch (farbe) {
		case "schwarz":
			return "#000000";
		case "farbe":
			if(art == "logo"){
				return "#b4b8bd";
			} else {
				return "#FF7929";
			}
		default:
			return "#FFFFFF";
	}
}

function dateiauswahl(evt) {
		var dateien = evt.target.files; // FileList object
		// Auslesen der gespeicherten Dateien durch Schleife
		if(dateien.length > 0){
			var f = dateien[0];
			// nur Bild-Dateien
			if (!f.type.match('image.*')) {
				document.getElementById("ausgabe").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
			} else {
			var reader = new FileReader();
			reader.onload = (function (theFile) {
				return function (e) {
					// erzeuge Thumbnails.
					var vorschau = document.getElementById("vorschau_bild");
					if(vorschau == null){
					vorschau = document.createElement('img');
					vorschau.id="vorschau_bild";
					vorschau.className = 'vorschau';
					}
					vorschau.src = e.target.result;
					vorschau.title = theFile.name;
					document.getElementById('vorschau')
						.insertBefore(vorschau, null);
				};
			})(f);
			// Bilder als Data URL auslesen.
			reader.readAsDataURL(f);
			document.getElementById("ausgabe").innerHTML = "Bitte wählen Sie die Eigenschaften aus <br/>und drücken auf 'Start'";
		}
	}
}