


var client;
var earthquakelayer;
var mypoint;
var mycircle;
var mypolygon;
var earthquakes;

function addPointLinePoly(){

    // add a point
    mypoint = L.marker([51.5,-0.09]).addTo(mymap)
        .bindPopup("<b>Hello!</b><br/>I am a popup.").openPopup();

    // add a circle
    mycircle = L.circle([51.5, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity:0.5
    }).addTo(mymap).bindPopup("I am a circle")

    // add a polygon (triangle)
    mypolygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ], {
        color:'red',
        fillColor: '#f03',
        fillOpacity: 0.5
        }
    ).addTo(mymap).bindPopup("I am a polygon");


}


function getEarthquakes(){
    client = new XMLHttpRequest();
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    client.open('GET', url);
    client.onreadystatechange = dataResponse;
    client.send();

}

function removeLayers(){
    mymap.removeLayer(earthquakelayer);
    mymap.removeLayer(mypoint)
    mymap.removeLayer(mycircle)
    mymap.removeLayer(mypolygon)


}

function dataResponse() {
    if (client.readyState == 4) {
        var geoJSONData = client.responseText;
        console.log('loading data')
        loadLayer(geoJSONData);
    }
}

function loadLayer(geoJSONData){
    var json = JSON.parse(geoJSONData);
    earthquakes = json;
    earthquakelayer = L.geoJson(json).addTo(mymap);
    mymap.fitBounds(earthquakelayer.getBounds());
}


