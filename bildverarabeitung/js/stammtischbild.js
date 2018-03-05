function buttonStartStammtisch () {
    var element = document.getElementById("bildStammtisch");	
    var pfad = element.value;
    var test = "test";
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