function query_slovicka() {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				if (xmlhttp.responseText == "?") {
					chrome.browserAction.setBadgeBackgroundColor({color:'#BC1616'});
					updateBadge("?");
				} else {
					var practice_count = parseInt(xmlhttp.responseText);
					chrome.browserAction.setBadgeBackgroundColor({color:'#4FACCD'});
					updateBadge(practice_count);
				}
			} else {
				chrome.browserAction.setBadgeBackgroundColor({color:'#BC1616'});
				updateBadge("?");
			}
		}
	}

	//xmlhttp.open("GET", "http://127.0.0.1:8000/get_practice_count", true);
	xmlhttp.open("GET", "http://www.engslovicka.eu/get_practice_count", true);
	xmlhttp.send();
}


function updateBadge(practice_count) {
	if (practice_count == 0) {
		chrome.browserAction.setBadgeText({text: ''});
	} else {
		chrome.browserAction.setBadgeText({text: practice_count.toString()});
	}
}


chrome.runtime.onInstalled.addListener(function() {
	chrome.browserAction.setBadgeBackgroundColor({color:'#4FACCD'});
	chrome.alarms.create({delayInMinutes: 30, periodInMinutes: 30});
	query_slovicka();
});

chrome.alarms.onAlarm.addListener(function() {
	query_slovicka();
});


chrome.browserAction.onClicked.addListener(function(tab) {
	updateBadge('0');
	chrome.tabs.create({'url': "http://www.engslovicka.eu"}, function(tab) {
	});
});