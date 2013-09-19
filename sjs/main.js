//= require lib/jquery-1.8.2

isScrollListenerActive = false;
page = 0;

var bDayYear = 2012;
var bDayMonth = 8; // August
var bDayDate = 19;

$(function() {
	// Show age
	var witBDay = new Date ( bDayYear, bDayMonth - 1, bDayDate );
	var today = new Date ();
	var age = today - witBDay;
	var weeks = Math.floor(age / 604800000);
	var years = Math.floor(age / 31536000000);

	// Compensate for the birthday on the 19th and calculate months
	var wM = new Date( witBDay - (1000 * 60 * 60 * 24 * (bDayDate - 1)) );
	var tM = new Date( today - (1000 * 60 * 60 * 24 * (bDayDate - 1)) );
	var months = tM.getMonth() - wM.getMonth() + (12 * ( tM.getFullYear() - wM.getFullYear()));

	var ageHTML = $('<div class="age"></div>');
	var weeksHTML = $('<span class="label">Age:</span><span class="value">' + weeks + '</span><span class="units">weeks</span>');
	var monthsHTML = $('<span class="label">Age:</span><span class="value">' + months + '</span><span class="units">months</span>');
	var yearsHTML = $('<span class="label">Age:</span><span class="value">' + years + '</span><span class="units">years</span>');

	if (weeks < 52)
		ageHTML.append(weeksHTML)
	else if ( months < 24 )
		ageHTML.append(monthsHTML)
	else
		ageHTML.append(yearsHTML);

	$('#info').html(ageHTML);
	getPage(page);

});

function getPage ( page ) {
	$.getJSON ('flickr.py?page=' + page, function (data) {
		var photos = data.photos;
		for (var i=0; i < photos.length; ++i ) {
			var photo = photos[i];
			var img = $('<img></img>');
			var ahref= $('<a></a>');
			img.attr('src', photo.source );
			img.attr('alt', photo.photo_title);
			ahref.attr('href', 'http://www.flickr.com/photos/' + photo.photo_owner + '/' + photo.photo_id + '/');
			ahref.attr('data-label', photo.photo_title);
			ahref.append(img);
			$('#images').append(ahref);
		}
		if (!isScrollListenerActive) {
			$('#loading').hide();
			setTimeout( addScrollListener, 2000 );
		}
	})
}

function addScrollListener () {
	isScrollListenerActive = true;
	$(window).scroll(checkScroll);
}

function checkScroll () {
	if (isScrollListenerActive) {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			isScrollListenerActive = false;
			page ++;
			$('#loading').show();
			getPage(page);
		}
	}
}

