function initLeaflet(){
    getFormData();
}

// Markers
var pinkMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

var blueMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'blue'
});


// get user's question points
var client;

function getFormData() {
    client = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getQuizPoints/' + httpPortNumber;
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

    var FormLayer= L.geoJson(json,{
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<DIV id='popup'" + feature.properties.id + "><h3>" + feature.properties.question_title + "</h3>";
                htmlString = htmlString + "<h4>" + feature.properties.question_text + "</h4>";
                htmlString = htmlString + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + feature.properties.answer_4 + "<br><br>";
                htmlString = htmlString + "</div>";
                return L.marker(latlng, {icon: blueMarker}).bindPopup(htmlString);
            },
        }

        ).addTo(mymap);
    mymap.fitBounds(FormLayer.getBounds());
}


// get other users questions points
var allClient;
var allQuestionsLayer;

document.getElementById("allQuestions").addEventListener("click", function () {
    if (mymap.hasLayer(allQuestionsLayer)) {
        mymap.removeLayer(allQuestionsLayer)
    } else {
        callQuestions();
    }

});

function callQuestions() {
    allClient = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getallquestions';
    console.log('url:', url);
    allClient.open("GET", url, true);
    allClient.onreadystatechange = processAllQuestions;
    try {
        allClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    allClient.send();
}

function processAllQuestions() {
    // while waiting response from server

    if (allClient.readyState < 4) {
    }
    else if (allClient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (allClient.status > 199 && allClient.status < 300) {
            var allData = allClient.responseText;
            loadAllQuestionsLayer(allData);
        }
    }
}

function loadAllQuestionsLayer(data) {

    var json = JSON.parse(data)[0];
    allQuestionsLayer = L.geoJson(json,{
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<DIV id='popup'" + feature.properties.id + "><h3>" + feature.properties.question_title + "</h3>";
                htmlString = htmlString + "<h4>" + feature.properties.question_text + "</h4>";
                htmlString = htmlString + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + feature.properties.answer_4 + "<br><br>";
                htmlString = htmlString + "</div>";
                return L.marker(latlng, {icon: pinkMarker}).bindPopup(htmlString);
            },
        }

        ).addTo(mymap);
}



