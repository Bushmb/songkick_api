var pageCount = 1;
var totalList = [];

function getEventHistoryFromApi(artistId) {
	
	var myApiKey = "ofqFcyXEVBW3U9se";
	// artist id with more than 50 results:  315398
	var artistId = artistId;

	var url = "http://api.songkick.com/api/3.0/artists/" + artistId + "/gigography.json?apikey=" + myApiKey + "&min_date=2013-01-01&max_date=2016-12-31";
	
	//"http://api.songkick.com/api/3.0/search/artists.json?query={search_query}&apikey={your_api_key}"

	$.getJSON(url + "&page=" + pageCount+ "&jsoncallback=?", function(data){
		var eventList = data.resultsPage.results.event;
		totalList = totalList.concat(eventList);
	
		if (eventList == undefined) {
			$('.errMsg').show().fadeOut(1200);
			reduceMyData(totalList);       
			return false;
		}
		else {
			if(data.resultsPage.totalEntries > 50){
				pageCount++;
				getEventHistoryFromApi(artistId);
			}
			
		}

	});
	

}

function reduceMyData(totalList){
	console.log(totalList);
	var eventName = totalList.reduce(function(eventArr, event){
		eventArr.push(event.displayName);
		return eventArr;
	}, []);

	var eventDate = totalList.reduce(function(eventArr, event){
		eventArr.push(event.start.date);
		return eventArr;
	}, []);


	var locations = totalList.reduce(function(eventArr, event){
		delete event.location.city;
		eventArr.push(event.location);
		return eventArr;
	}, []);
	
	console.log("NAMES" + eventName);
	console.log("DATES" + eventDate);
	//setMarkers(locations, eventDate, eventName);
}


$(document).ready(function() {

	getEventHistoryFromApi(315398);
	

});

