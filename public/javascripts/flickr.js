var maxCount=20;
var topPhotos = [];

function parsePhotoSearch(response, callback) {
	"use strict";

	if (response && response.photos && response.photos.photo) {

		var responseMax = response.photos.photo.slice(0,maxCount);

		$.each(responseMax, function(i,v) {
			topPhotos.push(v);
		});
	}

	callback(topPhotos);
}

function getBoundingBoxPhotos(minimumLongitude, minimumLatitude, maximumLongitude, maximumLatitude, callback) {
	"use strict";

	var longs = [minimumLongitude, maximumLongitude].sort(),
		lats = [minimumLatitude, maximumLatitude].sort();

	$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photos.search&per_page="+ maxCount +"&api_key=6119f02e6572a0626d9f1df373ef2bb4&min_upload_date=1212710400&bbox=" + longs[0] + "%2C" + lats[0] + "%2C" + longs[1] + "%2C" + lats[1] + "&has_geo=1&sort=interestingness-desc&extras=geo&format=json&jsoncallback=?", function(response){
		parsePhotoSearch(response,callback);
	});
}