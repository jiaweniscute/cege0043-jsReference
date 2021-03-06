var userMarker;

var testMarkerBlack = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'black'
});

// Track position
function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        document.getElementById('showLocation').innerHTML = 'Geolocation is not supported by this browser.';
    }
}

function showPosition(position) {
    if (userMarker) {
        mymap.removeLayer(userMarker)
    }
    userMarker = L.marker([position.coords.latitude, position.coords.longitude], {icon: testMarkerBlack}).addTo(mymap)
        .bindPopup("Your Position");

    mymap.setView([position.coords.latitude, position.coords.longitude], 18);

    closestFormPoint(position)
}


// calculate distance given two sets of coordinates
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180 / Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle / 360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
    if (unit == "K") {
        dist = dist * 1.609344;
    } // convert miles to km
    if (unit == "N") {
        dist = dist * 0.8684;
    } // convert miles to nautical miles return dist;
    return dist;
}

