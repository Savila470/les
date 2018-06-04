function buttonStartKalender () {
	var startDatum = getDatumForUrl("kalender_start_datum");	
	var startZeit = getZeitForUrl("kalender_start_zeit");	
	var endeDatum = getDatumForUrl("kalender_ende_datum");
	var endeZeit = getZeitForUrl("kalender_ende_zeit");		
	var titel = getTextForUrl("kalender_titel");
	var ort = getTextForUrl("kalender_ort");		
	var detail = getTextForUrl("kalender_detail");	

	var url = "http://www.google.com/calendar/event?action=TEMPLATE&dates=" + startDatum + startZeit + "%2F" + endeDatum + endeZeit + "&text=" + encodeURI(titel) + "&location=" + encodeURI(ort) + "&details=" + encodeURI(detail);
		
	var lineArray =  [
		"BEGIN:VCALENDAR\n",
		"VERSION:2.0\n",
		"PRODID:Leipzig eSports e.V.\n",
		"BEGIN:VEVENT\n",
		"UID:"+titel+"\n",
		"URL:www.leipzigesports.de\n",
		"LOCATION:"+ort+"\n",
		"SUMMARY:"+titel+"\n",
		"DESCRIPTION:"+detail+"\n",
		"CLASS:PRIVATE\n",
		"DTSTART:"+ startDatum + startZeit + "\n",
		"DTEND:" + endeDatum + endeZeit + "\n",
		"END:VEVENT\n",
		"END:VCALENDAR"
	];
	var file = new File(lineArray, "cal.ics");

	document.getElementById("ausgabeKalender").innerHTML = "<a href=" + url + " target=\"_blank\">Zum Kalender hinzufügen</a><br/><a href="+URL.createObjectURL(file)+" download=" + file.name + ">Datei runterladen</a><br/>" + url;

}

function getDatumForUrl(id){
	var datum = document.getElementById(id).value;
	return datum.replace(new RegExp('-', 'g'), "") + "T";
}

function getZeitForUrl(id){
	var zeit = document.getElementById(id).value;
	var zeitArray = zeit.split(":");
	if(zeitArray.length == 2){
		var zeitNum = parseInt(zeitArray[0]);
			// Wegen Zeitzone -2
		zeitNum-=2;
		if(zeitNum < 10){
			zeit = "0";
		} else {
			zeit = "";
		}
		zeit = zeit + zeitNum + zeitArray[1] + "00";		
	}

	return zeit + "Z";	
}

function getTextForUrl(id){
	return document.getElementById(id).value;
}