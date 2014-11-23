function query_slovicka() {
	//$.get("http://www.engslovicka.com/r/Bitcoin/", function(data) {
	$.get("http://www.engslovicka.eu/get_practice_count", function(data) {
		practice_count = parseInt(data);
		updateBadge();
	});
}


function main() {
	query_slovicka();
	timerHandle = window.setTimeout(main, 1800000);
}


function resetTimer() {
	window.clearTimeout(timerHandle);
	timerHandle = window.setTimeout(main, 1800000);
}


function updateBadge() {
	if (practice_count == '0') {
		chrome.browserAction.setBadgeText({text: ''});
	} else {
		chrome.browserAction.setBadgeText({text: practice_count.toString()});
	}
}


document.addEventListener('DOMContentLoaded', function () {
	practice_count = '0';
	chrome.browserAction.setBadgeBackgroundColor({color:'#4FACCD'});
	main();
});


chrome.browserAction.onClicked.addListener(function(tab) {
	resetTimer();
	practice_count = '0';
	updateBadge();
	chrome.tabs.create({'url': "http://www.engslovicka.eu"}, function(tab) {
	});
});