var FEED="http://vimeo.com/album/2286122/rss";
var ord = Number(ord) || Math.floor(Math.random()*10e12);
var LOAD_INTERVAL = 6;
var NUM_LOADED = 0;
var VIDEO_URLS = [];
var isScrollListenerActive = false;

$(document).ready(function () {
	parseRSS (FEED);
});

function parseRSS(url, callback) {
	$.ajax({
		url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=?&q=' + encodeURIComponent(url) + '&ord=' + ord,
		dataType: 'jsonp',
		success: function(data) {
			processFeed (data.responseData.feed);
		}
	});
}

function processFeed ( feed ) {
	var entries = feed.entries;
	var i = entries.length; while (i--) {
		VIDEO_URLS.push ( entries[i].link );
	}
	console.log (VIDEO_URLS);
	addVideo ();
}

function addVideo() {
	if (VIDEO_URLS.length) {
		var videoUrl = VIDEO_URLS.shift();
		NUM_LOADED++;
		var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		width = Math.min(640, width);
		var url = '//www.vimeo.com/api/oembed.json?url=' + encodeURIComponent(videoUrl) + '&callback=embedVideo&width=' + width;
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: embedVideo
		});
	}
}

function embedVideo(video) {
	var vidHolder = $('<div class="vid"></div>');
	vidHolder.html( unescape(video.html) );
	$('#wrapper').append(vidHolder);
	if (NUM_LOADED % LOAD_INTERVAL !== 0) addVideo();
	else if ( VIDEO_URLS.length !== 0) addScrollListener();
	else return;
}

function addScrollListener () {
	isScrollListenerActive = true;
	$(window).scroll(checkScroll);
}

function checkScroll () {
	if (isScrollListenerActive) {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			isScrollListenerActive = false;
			addVideo();
		}
	}
}

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

});
