var setAPI = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157631261275342&per_page=500&page=1&api_key=c3c9b8e45305233bb97e431394dfb082&jsoncallback=?";
var data;
var totalImages = 0;

function parseData ( json ) {
	data = json;
	totalImages = data.photoset.photo.length;
	$.each(data.photoset.photo.reverse(), parsePhoto );
}

function parsePhoto ( i, photo ) {
	var id = photo.id;
	var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";
	$("<img class='lazy' src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' />").attr('id', "photo" + photo.id).appendTo("#images").wrap(("<a href='" + a_href + "'></a>"));
	var imageAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=c3c9b8e45305233bb97e431394dfb082&photo_id=" + photo.id + "&jsoncallback=?";

	$.getJSON ( imageAPI, function ( json ) {
		var sizelist = json.sizes.size;

		var j = sizelist.length; while (j--) {

			if (sizelist[j].label == "Large" ) {

				var width = parseInt ( sizelist[j].width, 10 );
				var height = parseInt ( sizelist[j].height, 10 );
				var source = sizelist[j].source;

				var photo = $('#photo' + id );

				if (photo)
				{
					photo.attr('width', width);
					photo.attr('height', height);
					if (width > height) {
						photo.addClass('wide');
					} else {
						photo.addClass('tall');
					}
					photo.attr('data-original', source);

					--totalImages;
					console.log (totalImages);
					if (totalImages < 2)
					{
						$('#loading').hide();
						$('#images').css('visibility', 'visible');
						$(".lazy").lazyload({
							effect : "fadeIn"
						});
					}
					else
					{
						$('#loading').append('.');
					}
				}
				return;
			}
		}
	});
}

function parseSizes ( json ) {
	console.log (json);
	die();
}

$(function() {

	$.getJSON( setAPI, parseData );

});
