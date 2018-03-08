function buttonStartStammtisch () {
    var bild_height = 1080;
    var bild_width = 1920;
    var datum = document.getElementById("datum").value;
    var dunkel = document.getElementById("dunkel").value;
    dunkel = dunkel * 0.01;
    var blur = document.getElementById("blur").value;
    var logoArtBild = document.getElementById('logoArtBild');

    var c=document.getElementById("canvasStammtisch");
	var ctx=c.getContext("2d");
	
	//####################################################//
	// Ab hier wird das Hintergrund-BILD gemalt ###########//
	//####################################################//	
	var bild = document.getElementById('vorschau_bild_stammtisch');
	c.height = bild_height;
	c.width = bild_width;
    ctx.filter = "blur(" + blur + "px)";
    ctx.drawImage(bild, 0, 0, 1920, 1080);	 
    ctx.filter = "none";
    ctx.globalAlpha = dunkel;
    ctx.fillRect(0,0,bild_width,bild_height);
    ctx.globalAlpha = 1;
	
	//####################################################//
	// Ab hier wird das Stuk-LOGO gemalt #################//
	//####################################################//
    var stuk_logo = new Image();
    stuk_logo.src = "bilder/stuk_logo.png";
    stuk_logo.width = stuk_logo.width*0.8;
    stuk_logo.height = stuk_logo.height*0.8;
    ctx.drawImage(stuk_logo, 20, bild_height-stuk_logo.height-17, stuk_logo.width, stuk_logo.height);	 
    
	//####################################################//
	// Ab hier wird das LES-LOGO gemalt ##################//
	//####################################################//
    var les_logo = new Image();
    les_logo.src = "bilder/logo_farbe.svg";
    ctx.drawImage(les_logo, 900, 180, les_logo.width*0.92, les_logo.height*0.92);
    
    //####################################################//
	// Ab hier wird der Text geschrieben #################//
	//####################################################//    
	ctx.font = "bold 100px Titillium Web";
	ctx.fillStyle = "white";
    ctx.fillText("Kommt zum",  350, 297);  
	ctx.font = "bold 110px Titillium Web";
    ctx.fillText("Stammtisch!", 574, 388);    
	ctx.font = "88px Titillium Web";
    ctx.fillText("am " + datum, 1036, 455);
	ctx.font = "70px Titillium Web";
    ctx.fillText("www.leipzigesports.de", 998, 1050);

    //####################################################//
	// Ab hier wird das Logo-BILD gemalt ###########//
	//####################################################//	
    var logo = document.getElementById('vorschau_logo_stammtisch');
    var mitte_height = 450;
    var mitte_width = bild_width/2;
    if(logoArtBild.checked){
        if(logo != null){
            mitte_width = mitte_width - bild_width/3;
            ctx.drawImage(logo, mitte_width, mitte_height, bild_width/3, bild_height/3);    
        }
    } else {
        var logoText = document.getElementById("logoText").value
        ctx.font = "italic 200px Kanit black";
        var textLength = ctx.measureText(logoText).width;
        mitte_width = mitte_width - textLength  /2;  
        ctx.fillText(logoText, mitte_width, 700);
    }

    //####################################################//
	// Ab hier wird das Grafik-BILD gemalt ###########//
	//####################################################//	
    var grafik = document.getElementById('vorschau_grafik_stammtisch');
    if(grafik != null){
        ctx.drawImage(grafik, 0, 0, grafik.width, grafik.height);
    }

	//####################################################//
	// ERFOLG! ###########################################//
	//####################################################//
    bild.style.display = "none";
    if(logo != null){
        logo.style.display = "none";
    }
    if(grafik != null){
        grafik.style.display = "none";
    }
	document.getElementById("ausgabeStammtisch").innerHTML = "Erfolg! Jetzt nur noch<br/>Rechtsklick > Bild speichern unter...<br/> klicken.";
}

function dateiauswahlStammtisch(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    if(dateien.length > 0){
        var f = dateien[0];
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            document.getElementById("ausgabeStammtisch").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
        } else {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // erzeuge Thumbnails.
                    var vorschau = document.getElementById("vorschau_bild_stammtisch");
                    if(vorschau == null){
                    vorschau = document.createElement('img');
                    vorschau.id="vorschau_bild_stammtisch";
                    vorschau.className = 'vorschau';
                    }
                    vorschau.src = e.target.result;
                    vorschau.title = theFile.name;
                    document.getElementById('vorschauStammtisch')
                        .insertBefore(vorschau, null);
                };
            })(f);
            // Bilder als Data URL auslesen.
            reader.readAsDataURL(f);
            document.getElementById("ausgabeStammtisch").innerHTML = "Bitte wählen Sie die Eigenschaften aus <br/>und drücken auf 'Start'";
        }
    }
}

function auswahlLogoStammtisch(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    if(dateien.length > 0){
        var f = dateien[0];
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            document.getElementById("ausgabeStammtisch").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
        } else {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // erzeuge Thumbnails.
                    var vorschau = document.getElementById("vorschau_logo_stammtisch");
                    if(vorschau == null){
                    vorschau = document.createElement('img');
                    vorschau.id="vorschau_logo_stammtisch";
                    vorschau.className = 'vorschau';
                    }
                    vorschau.src = e.target.result;
                    vorschau.title = theFile.name;
                    document.getElementById('vorschauLogoStammtisch')
                        .insertBefore(vorschau, null);
                };
            })(f);
            // Bilder als Data URL auslesen.
            reader.readAsDataURL(f);
        }
    }
}

function auswahlGrafikStammtisch(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    if(dateien.length > 0){
        var f = dateien[0];
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            document.getElementById("ausgabeStammtisch").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
        } else {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // erzeuge Thumbnails.
                    var vorschau = document.getElementById("vorschau_grafik_stammtisch");
                    if(vorschau == null){
                    vorschau = document.createElement('img');
                    vorschau.id="vorschau_grafik_stammtisch";
                    vorschau.className = 'vorschau';
                    }
                    vorschau.src = e.target.result;
                    vorschau.title = theFile.name;
                    document.getElementById('vorschauGrafikStammtisch')
                        .insertBefore(vorschau, null);
                };
            })(f);
            // Bilder als Data URL auslesen.
            reader.readAsDataURL(f);
        }
    }
}

function dunkelChange(evt) {
    document.getElementById('dunkelWert').value = evt.target.value + " % ";
}

function blurChange(evt) {
    document.getElementById('blurWert').value = evt.target.value;
}