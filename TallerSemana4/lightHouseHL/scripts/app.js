(function () {
    'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
  var dbPromise = indexedDB.open('taller2-db1', 1);
  var db;

    var app = {
        isLoading: true,
        visibleCards: {},
        selectedTimetables: [],
        spinner: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.cardTemplate'),
        container: document.querySelector('.main'),
        addDialog: document.querySelector('.dialog-container')
    };


    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    document.getElementById('butRefresh').addEventListener('click', function () {
        // Refresh all of the metro stations
        app.updateSchedules();
    });

    document.getElementById('butAdd').addEventListener('click', function () {
        // Open/show the add new station dialog
        app.toggleAddDialog(true);
    });

    document.getElementById('butAddCity').addEventListener('click', function () {


        var select = document.getElementById('selectTimetableToAdd');
        var selected = select.options[select.selectedIndex];
        var key = selected.value;
        var label = selected.textContent;
        if (!app.selectedTimetables) {
            app.selectedTimetables = [];
        }
        app.getSchedule(key, label);
        app.selectedTimetables.push({key: key, label: label});
        app.toggleAddDialog(false);
		
		console.log('Entro butAddCity');
		if (db.objectStoreNames.contains('selectedSched')){
			var tx = db.transaction("selectedSched", "readwrite");
			var store = tx.objectStore("selectedSched");
			store.add({key: key, label: label});
		}
		
    });

    document.getElementById('butAddCancel').addEventListener('click', function () {
        // Close the add new station dialog
        app.toggleAddDialog(false);
    });


    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    // Toggles the visibility of the add new station dialog.
    app.toggleAddDialog = function (visible) {
        if (visible) {
            app.addDialog.classList.add('dialog-container--visible');
        } else {
            app.addDialog.classList.remove('dialog-container--visible');
        }
    };

    // Updates a timestation card with the latest weather forecast. If the card
    // doesn't already exist, it's cloned from the template.

    app.updateTimetableCard = function (data) {
        var key = data.key;
        var dataLastUpdated = new Date(data.created);
        var schedules = data.schedules;
        var card = app.visibleCards[key];

        if (!card) {
            var label = data.label.split(', ');
            var title = label[0];
            var subtitle = label[1];
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.label').textContent = title;
            card.querySelector('.subtitle').textContent = subtitle;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[key] = card;
        }
        card.querySelector('.card-last-updated').textContent = data.created;

        var scheduleUIs = card.querySelectorAll('.schedule');
        for(var i = 0; i<4; i++) {
            var schedule = schedules[i];
            var scheduleUI = scheduleUIs[i];
            if(schedule && scheduleUI) {
                scheduleUI.querySelector('.message').textContent = schedule.message;
            }
        }

        if (app.isLoading) {
			window.cardLoadTime = performance.now();
            app.spinner.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }
    };

    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/


    app.getSchedule = function (key, label) {
        var url = 'https://api-ratp.pierre-grimaud.fr/v3/schedules/' + key;

		if ('caches' in window) {
		  /*
		   * Check if the service worker has already cached this city's weather
		   * data. If the service worker has the data, then display the cached
		   * data while the app fetches the latest data.
		   */
		  caches.match(url).then(function(response) {
			if (response) {
			  response.json().then(function updateFromCache(json) {
				var results = json.query.results;
				results.key = key;
				results.label = label;
				results.created = json.query.created;
                app.updateTimetableCard(results);
			  });
			}
		  });
		}
		
		
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.response);
					window.apiCallTime = performance.now();
				    console.log(window.apiCallTime);
                    var result = {};
                    result.key = key;
                    result.label = label;
                    result.created = response._metadata.date;
                    result.schedules = response.result.schedules;
                    app.updateTimetableCard(result);
                }
            } else {
                // Return the initial weather forecast since no data is available.
                app.updateTimetableCard(initialStationTimetable);
            }
        };
        request.open('GET', url);
        request.send();
    };

    // Iterate all of the cards and attempt to get the latest timetable data
    app.updateSchedules = function () {
        var keys = Object.keys(app.visibleCards);
        keys.forEach(function (key) {
            app.getSchedule(key);
        });
    };

    /*
     * Fake timetable data that is presented when the user first uses the app,
     * or when the user has not saved any stations. See startup code for more
     * discussion.
     */

    var initialStationTimetable = {

        key: 'metros/1/bastille/A',
        label: 'Bastille, Direction La Défense',
        created: '2017-07-18T17:08:42+02:00',
        schedules: [
            {
                message: '0 mn'
            },
            {
                message: '2 mn'
            },
            {
                message: '5 mn'
            }
        ]


    };

	  // Save list of cities to localStorage.
   app.saveSelectedSchedules = function(isFirst) {
	console.log('Entro saveSelectedSchedules');
	dbPromise.onupgradeneeded = function() {
	  // The database did not previously exist, so create object stores and indexes.
	  console.log('Entro saveSelectedSchedules.onupgradeneeded');
	  db = dbPromise.result;
	  if(isFirst == true){
		var store = db.createObjectStore("firstLoad", {keyPath: "key"});
		  console.log(app.selectedTimetables[0]);
		  store.add(app.selectedTimetables[0]);
		  store = db.createObjectStore("selectedSched", {keyPath: "key"});
		  store.createIndex('key', 'key', {unique: false});
		  store.add(app.selectedTimetables[0]);
	  }else{
		var store = db.createObjectStore("selectedSched", {keyPath: "key"});
	  }
    	localStorage.existDB = 'true';
	};
	dbPromise.onsuccess = function() {
		db = dbPromise.result;
	};

	
	};

	app.loadSelectedSchedules = function() {
	console.log(localStorage.existDB);
	if (localStorage.existDB == 'true' ){
		console.log('Entro loadSelectedSchedules');
		//var dbPromise = indexedDB.open('taller2-db1', 1);
		if (db.objectStoreNames.contains('selectedSched')){
			console.log('Entro loadSelectedSchedules.if');
		};
		dbPromise.onsuccess = function() {
			db = dbPromise.result;
			console.log('Entro loadSelectedSchedules.onsuccess');
			if (db.objectStoreNames.contains('selectedSched')){
				var tx = db.transaction("selectedSched", "readonly");
				var store = tx.objectStore("selectedSched");
				var index = store.index("key");

				var request = index.getAll();
				request.onsuccess = function() {
				  var matching = request.result;
				  console.log(matching);
				  /*if (matching !== undefined) {
					// A match was found.
					report(matching.isbn, matching.title, matching.author);
				  } else {
					// No match was found.
					report(null);
				  }*/
				};
			}
	}

		/*if (!db.objectStoreNames.contains('selectedSched')){
		  store = db.createObjectStore("selectedSched", {keyPath: "key"});
		  store.createIndex('key', 'key', {unique: false});
		}else{
			var tx = db.transaction("selectedSched", "readonly");
			var store = tx.objectStore("selectedSched");
			var index = store.index("key");

			var request = index.getAll();
		}*/
	};

	
	/*
    var db = dbPromise.result;
	
	var tx = db.transaction("selectedSched", "readonly");
	var store = tx.objectStore("selectedSched");
	var index = store.index("key");

	var request = index.getAll();
	request.onsuccess = function() {
	  var matching = request.result;
	  console.log(matching);*/
	  /*if (matching !== undefined) {
		// A match was found.
		report(matching.isbn, matching.title, matching.author);
	  } else {
		// No match was found.
		report(null);
	  }*/
	/*};*/
	
	
	};

    /************************************************************************
     *
     * Code required to start the app
     *
     * NOTE: To simplify this codelab, we've used localStorage.
     *   localStorage is a synchronous API and has serious performance
     *   implications. It should not be used in production applications!
     *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
     *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
     ************************************************************************/
	//app.loadSelectedSchedules();
    app.getSchedule('metros/1/bastille/A', 'Bastille, Direction La Défense');
    app.selectedTimetables = [
        {key: initialStationTimetable.key, label: initialStationTimetable.label}
    ];
	app.saveSelectedSchedules(true);
	if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
    }
})();
