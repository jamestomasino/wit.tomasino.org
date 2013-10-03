var FEED="http://vimeo.com/jamestomasino/videos/rss";
var LOAD_INTERVAL = 3;
var NUM_LOADED = 0;
var VIDEO_URLS = [];
var isScrollListenerActive = false;

$(document).ready(function () {
	parseRSS (FEED);
});

function parseRSS(url, callback) {
	$.ajax({
		url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=?&q=' + encodeURIComponent(url),
		dataType: 'jsonp',
		success: function(data) {
			processFeed (data.responseData.feed);
		}
	});
}

function processFeed ( feed ) {
	var entries = feed.entries;
	for ( var i = 0; i < entries.length; ++i ) {
		VIDEO_URLS.push ( entries[i].link );
	}
	addVideo ();
}

function addVideo() {
	if (VIDEO_URLS.length) {
		var videoUrl = VIDEO_URLS.shift();
		NUM_LOADED++;
		var url = 'http://www.vimeo.com/api/oembed.json?url=' + encodeURIComponent(videoUrl) + '&callback=embedVideo&width=640';
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

