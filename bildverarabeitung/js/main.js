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
	"hintergrund.png", 
	"sc2_logo.png", 
	"lol_logo.png", 
	"r6_logo.png", 
	"hots_logo.png", 
	"csgo_logo.png", 
	"pubg_logo.png", 
	"ow_logo.png"
)