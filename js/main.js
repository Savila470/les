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
   	document.getElementById('datum').valueAsDate = new Date();
   	document.getElementById('jahr').value = new Date().getFullYear();
    document.getElementById('kw').value = getWeek(new Date());
});

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
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
preload(
	"bilder/hintergrund.png", 
	"bilder/sc2_logo.png", 
	"bilder/lol_logo.png", 
	"bilder/r6_logo.png", 
	"bilder/hots_logo.png", 
	"bilder/csgo_logo.png", 
	"bilder/pubg_logo.png", 
	"bilder/ow_logo.png",
	"bilder/stuk_logo.png",
	"bilder/logo_farbe.svg"
)
	
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