jQuery(document).ready(function() {
	// Standard
	jQuery('.tabs .tab-links a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');

		// Show/Hide Tabs
		jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

		e.preventDefault();
	});

	for(var eintragNr = 1; eintragNr <= 8; eintragNr++){
		var team = document.getElementById("team" + eintragNr);
		for(var i = 0; i < teams.length; i++){
			team.options[team.options.length] = new Option(teams[i], teams[i]);
		}
		var game = document.getElementById("spiel" + eintragNr);
		for(var i = 0; i < games.length; i++){
			game.options[game.options.length] = new Option(games[i].label, games[i].picName);
		}
	};

   	document.getElementById('datum').valueAsDate = new Date();
   	document.getElementById('jahr').value = new Date().getFullYear();
    document.getElementById('kw').value = getWeek(new Date());
});

var images = [];
function preload(toPreload) {
    for (var i = 0; i < toPreload.length; i++) {
        images[i] = new Image();
        images[i].src = toPreload[i];
    }
}

function getWeek(date) {
	var tdt = new Date(date.valueOf());
    var dayn = (date.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
    	tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

//-- usage --//
preload(preloadBilder)
	
window.onload=function(){
	// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu aus
	document.getElementById('bild').addEventListener('change', dateiauswahl, false);
	document.getElementById('bildStammtisch').addEventListener('change', dateiauswahlStammtisch, false);
	document.getElementById('logoStammtisch').addEventListener('change', auswahlLogoStammtisch, false);
	document.getElementById('grafikRechtsStammtisch').addEventListener('change', auswahlGrafikRechtsStammtisch, false);
	document.getElementById('grafikLinksStammtisch').addEventListener('change', auswahlGrafikLinksStammtisch, false);

	document.getElementById('dunkel').addEventListener('input', dunkelChange, false);
	document.getElementById('blur').addEventListener('input', blurChange, false);
}