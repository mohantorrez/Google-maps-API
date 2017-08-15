function initMap(){
	this.map = new google.maps.Map(document.getElementById("map"),{
		zoom: 15
	});
	this.marker = new google.maps.Marker({
				map: map
			})
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function (position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			this.map.setCenter(initialLocation);
			this.marker.setPosition(initialLocation);
	    });

	 }
}

function searchBox(){
	initMap();
	var searchBoxField = new google.maps.places.SearchBox(document.getElementById("search-from"));
	var searchBoxFieldTo = new google.maps.places.SearchBox(document.getElementById("search-to"));
	
	// Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBoxField.setBounds(map.getBounds());
    });
	
	searchBoxField.addListener('places_changed', function(){
			var newSeachFrom = searchBoxField.getPlaces();
			var bounds = new google.maps.LatLngBounds();
			var i, newPlace;

			for (i=0; newPlace = newSeachFrom[i]; i++){
				newFrom = newPlace.geometry.location;
				map.setCenter(newPlace.geometry.location);
				marker.setPosition(newPlace.geometry.location)
			}
		});
}

function animation(){
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

function customIcon(){
	var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	if(marker.getIcon() != null){
		marker.setIcon(null);
	} else{
		marker.setIcon(image);
	}
}

function removeMarker(){
	if(marker.getMap() == null){
		marker.setMap(map);
	} else{
		marker.setMap(null);
	}
}

function calculateDistance(){
		var selectedMode;
		if(typeof document.getElementById('mode') != 'undefined' && document.getElementById('mode')	){
	    	selectedMode = document.getElementById('mode').value;
		}
 		this.map = new google.maps.Map(document.getElementById("map"),{
	 		zoom:15
	 	});
 		var directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': false }),
 			directionsService = new google.maps.DirectionsService();
 		
 		directionsDisplay.setMap(map);
 		document.getElementById('dPanel').innerHTML = ''
    	directionsDisplay.setPanel(document.getElementById('dPanel'));
 		source = document.getElementById("search-from").value;
	    destination = document.getElementById("search-to").value;
	 
	    var request = {
	        origin: source,
	        destination: destination,
	        travelMode: selectedMode ? google.maps.TravelMode[selectedMode] : google.maps.TravelMode.DRIVING
	    };
	    directionsService.route(request, function (response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	        }
	    });
	    var service = new google.maps.DistanceMatrixService();
	        service.getDistanceMatrix({
	            origins: [source],
	            destinations: [destination],
	            travelMode: selectedMode ? google.maps.TravelMode[selectedMode] : google.maps.TravelMode.DRIVING,
	            unitSystem: google.maps.UnitSystem.METRIC,
	        }, function (response, status) {
	            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
	                var distanceKm = response.rows[0].elements[0].distance.text;
	                var duration = response.rows[0].elements[0].duration.text;
	                var distance = document.getElementById("output");
	               	distance.innerHTML = "<select id='mode' onchange='calculateDistance()'><option value='DRIVING'>Drive</option><option value='WALKING'>Walk</option><option value='TRANSIT'>Bus</option></select><br />";
	                distance.innerHTML += "Distance: " + distanceKm + "<br />";
	                distance.innerHTML += "Duration:" + duration;
	     
	            } else {
	                alert("Unable to find the distance via road.");
	            }
	        });
 	}