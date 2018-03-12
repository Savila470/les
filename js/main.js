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
});

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
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
	"bilder/ow_logo.png"
)
	
window.onload=function(){
	// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu aus
	document.getElementById('bild').addEventListener('change', dateiauswahl, false);
}