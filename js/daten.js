var teams = [
                "Ohana", 
                "Team 1", 
                "PvP", 
                "B-Ware", 
                "PU"
            ];

var games = [
                new Game("StarCraft II", "sc2"), 
                new Game("League of Legends", "lol"), 
                new Game("CS: GO", "csgo"), 
                new Game("Heroes of the Storm", "hots"), 
                new Game("Overwatch", "sc2"), 
                new Game("Rainbow Six Siege", "r6"), 
                new Game("PUBG", "pubg"), 
            ]

var preloadBilder = [    
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
            ]

function Game(label, picName) {
    this.label = label;
    this.picName = picName;
}