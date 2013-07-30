//= require lib/jquery-1.8.2
//= require lib/jquery-paged-scroll

$(function() {

	$('#images').paged_scroll({
		handleScroll:function (page, container, doneCallback) {
			console.log ('handleScroll:', page, container);
			getPage(page);
			doneCallback();
		},
		triggerFromBottom:'30px',
		loading : {
				html  : '<div class="paged-scroll-loading"><img alt="Loading..." src="images/ajax-loader.gif" /></div>'
		},
		targetElement:$('#images'),
		startPage:0,
		pagesToScroll:null,
		useScrollOptimization:true,
		checkScrollChange:500,
		monitorChangeInterval:300,
		monitorTargetChange:true,
		debug:true
	});

	// Show age
	var witBDay = new Date ( 2012, 7, 19 );
	var today = new Date ();
	var age = today - witBDay;
	var weeks = Math.floor(age / 604800000);
	var years = Math.floor(age / 31536000000);
	var months;
    months = (today.getFullYear() - witBDay.getFullYear()) * 12;
    months -= today.getMonth();
    months += witBDay.getMonth();
	months = Math.abs(months);

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
	getPage(0);
});

function getPage ( page ) {
	$.getJSON ('flickr.py?page=' + page, function (data) {
		console.log (data);
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
	})
}

