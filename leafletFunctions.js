var client;
var earthquakelayer;
var mypoint;
var mycircle;
var mypolygon;
var earthquakes;
var eclient;

function addPointLinePoly() {

    // add a point
    mypoint = L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello!</b><br/>I am a popup.").openPopup();

    // add a circle
    mycircle = L.circle([51.5, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle")

    // add a polygon (triangle)
    mypolygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }
    ).addTo(mymap).bindPopup("I am a polygon");


}


// function getEarthquakes() {
//     eclient = new XMLHttpRequest();
//     var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
//     eclient.open('GET', url);
//     eclient.onreadystatechange = dataResponse;
//     eclient.send();
//
// }
//
// function removeLayers() {
//     mymap.removeLayer(earthquakelayer);
//     mymap.removeLayer(mypoint)
//     mymap.removeLayer(mycircle)
//     mymap.removeLayer(mypolygon)
//
//
// }
//
// function dataResponse() {
//     if (eclient.readyState == 4) {
//         var geoJSONData = eclient.responseText;
//         loadLayer(geoJSONData);
//     }
// }
//
// function loadLayer(geoJSONData) {
//     var json = JSON.parse(geoJSONData);
//     console.log('earthquake json below')
//     console.log(json)
//     earthquakelayer = L.geoJson(json).addTo(mymap);
//     mymap.fitBounds(earthquakelayer.getBounds());
// }

var client;

function getFormData() {
    console.log('getFormData called',httpPortNumber);
    client = new XMLHttpRequest();
    //var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getFormData/' + httpPortNumber;
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getFormData/' + httpPortNumber;

    console.log('url:', url)
    client.open("GET", url, true);
    client.onreadystatechange = processFormData;
    try {
        client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    client.send();
}

function processFormData() {
    // while waiting response from server

    if (client.readyState < 4) {
        console.log('loading...')
    }
    else if (client.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (client.status > 199 && client.status < 300) {
            var FormData = client.responseText;
            loadFormLayer(FormData);
        }
    }
}

function loadFormLayer(FormData) {

    var json = JSON.parse(FormData)[0];
    var FormLayer = L.geoJson(json).addTo(mymap);
    //mymap.fitBounds(FormLayer.getBounds());
}


