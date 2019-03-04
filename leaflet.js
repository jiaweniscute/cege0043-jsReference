// initialise map

var mymap = L.map('mapid').setView([51.52452, -0.13382], 16);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);



// get coordinates

var popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Drop Quiz Question Here")
        .openOn(mymap);

    document.getElementById("longitude").value = e.latlng.lng;
    document.getElementById("latitude").value = e.latlng.lat;

}

// now add the click event detector to the map
mymap.on('click', onMapClick);