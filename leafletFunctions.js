// Markers

var blueMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'blue'
});

var greenMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'green'
});

var redMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'red'
});

var pinkMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

// get user questions
var client;
var formLayer;

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
    var formJSON = JSON.parse(FormData)[0];
    formLayer = L.geoJson(formJSON,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<DIV id='popup'" + feature.properties.id + "><h3>" + feature.properties.question_title + "</h3>";
                htmlString = htmlString + "<h4>" + feature.properties.question_text + "</h4>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_1' />" + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_2' />" + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_3' />" + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_4' />" + feature.properties.answer_4 + "<br><br>";
                htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + "," + latlng.lat + "," + latlng.lng + ");return false;'>Submit Answer</button>";
                htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
                htmlString = htmlString + "</div>";
                return L.marker(latlng, {icon: blueMarker}).bindPopup(htmlString);
            },
        }).addTo(mymap);

}

function checkAnswer(questionID, lat, lng) {
    var answer = document.getElementById("answer" + questionID).innerHTML;
    // now check the question radio buttons
    var correctAnswer = false;
    var answerSelected = 0;
    for (var i = 1; i < 5; i++) {
        if (document.getElementById(questionID + "_" + i).checked) {
            answerSelected = i;
        }
        if ((document.getElementById(questionID + "_" + i).checked) && (i == answer)) {
            L.marker([lat, lng], {icon: greenMarker}).addTo(mymap);
            alert("Correct! Move on to the next point.");
            correctAnswer = true;
        }
    }
    if (correctAnswer === false) {
        // they didn't get it right
        L.marker([lat, lng], {icon: redMarker}).addTo(mymap);
        alert("Sorry your answer was wrong.");
    }

    mymap.closePopup();


    // upload user's answer
    var postString = "port_id=" + httpPortNumber + "&question_id=" + questionID +
        "&answer_selected=" + answerSelected + "&correct_answer=" + answer;

    processAnswer(postString);
    getNumCorrect();

}

/// post answer
var answerclient;  // the global variable that holds the request
function processAnswer(postString) {
    answerclient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadAnswer";
    answerclient.open('POST', url, true);
    answerclient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    answerclient.send(postString);
}

/// get question within 15 m
function closestFormPoint(position) {

    var dist = 0.015; // 15 metres
    var closestFormPoint = 0;

    var userlat = position.coords.latitude;
    var userlng = position.coords.longitude;


    formLayer.eachLayer(function (layer) {
        console.log('this marker is: ', layer.feature.properties.question_title);
        var distance = calculateDistance(userlat, userlng, layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        console.log('distance away in km',distance);
        if (distance < dist) {
            closestFormPoint = layer.feature.properties.id;
        }
    });
    // for this to be a proximity alert, the minDistance must be
    // closer than a given distance - you can check that here
    // using an if statement
    // show the popup for the closest point
    formLayer.eachLayer(function (layer) {
        if (layer.feature.properties.id == closestFormPoint) {
            layer.openPopup();
        }
    });
}


// get 5 questions closest to user's location, added by any user
var fiveclosestclient;
var fiveclosestlayer;

document.getElementById("fiveclosest").addEventListener("click", function () {
    if (mymap.hasLayer(fiveclosestlayer)) {
        mymap.removeLayer(fiveclosestlayer)
    } else {
        getFiveClosest();
    }

});

function getFiveClosest() {
    // console.log(userMarker.getLatLng())
    var location = userMarker.getLatLng();
    var lat = location['lat'];
    var lng = location['lng'];

    fiveclosestclient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getfiveclosest';
    fiveclosestclient.open("POST", url, true);
    fiveclosestclient.onreadystatechange = processFiveClosest;
    try {
        fiveclosestclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }

    poststring = "lat=" + lat + "&lng=" + lng;
    fiveclosestclient.send(poststring);
}

function processFiveClosest() {
    // while waiting response from server

    if (fiveclosestclient.readyState < 4) {
    }
    else if (fiveclosestclient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (fiveclosestclient.status > 199 && fiveclosestclient.status < 300) {
            var data = fiveclosestclient.responseText;
            loadFiveClosest(data);
        }
    }
}

function loadFiveClosest(data) {
    var formJSON = JSON.parse(data)[0];
    fiveclosestlayer = L.geoJson(formJSON,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<DIV id='popup'" + feature.properties.id + "><h3>" + feature.properties.question_title + "</h3>";
                htmlString = htmlString + "<h4>" + feature.properties.question_text + "</h4>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_1' />" + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_2' />" + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_3' />" + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_4' />" + feature.properties.answer_4 + "<br><br>";
                htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + "," + latlng.lat + "," + latlng.lng + ");return false;'>Submit Answer</button>";
                htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
                htmlString = htmlString + "</div>";
                return L.marker(latlng, {icon: pinkMarker}).bindPopup(htmlString);
            },
        }).addTo(mymap);

}


// get last 5 questions by user
var lastfiveclient;
var lastfivelayer;

document.getElementById("lastfive").addEventListener("click", function () {
    if (mymap.hasLayer(lastfivelayer)) {
        mymap.removeLayer(lastfivelayer)
    } else {
        getLastFive();
    }

});

function getLastFive() {
    lastfiveclient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/lastfive/' + httpPortNumber;
    lastfiveclient.open("GET", url, true);
    lastfiveclient.onreadystatechange = processLastFive;
    try {
        lastfiveclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    lastfiveclient.send();
}

function processLastFive() {
    // while waiting response from server
    if (lastfiveclient.readyState < 4) {
    }
    else if (lastfiveclient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (lastfiveclient.status > 199 && lastfiveclient.status < 300) {
            var data = lastfiveclient.responseText;
            loadLastFive(data);
        }
    }
}

function loadLastFive(data) {
    var formJSON = JSON.parse(data)[0];
    lastfivelayer = L.geoJson(formJSON,
        {
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

                if (feature.properties.correct_answer == true) {
                    var marker = greenMarker;
                }
                else {
                    var marker = redMarker;
                }
                return L.marker(latlng, {icon: marker}).bindPopup(htmlString);
            },
        }).addTo(mymap);

}

// get questions that user hasnt answered correctly

var leftoverclient;
var leftoverlayer;

document.getElementById("leftover").addEventListener("click", function () {
    if (mymap.hasLayer(leftoverlayer)) {
        mymap.removeLayer(leftoverlayer);
        mymap.addLayer(formLayer);
    } else {
        getLeftover();
        mymap.removeLayer(formLayer);

    }

});

function getLeftover() {

    leftoverclient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/lastfive/' + httpPortNumber;
    leftoverclient.open("GET", url, true);
    leftoverclient.onreadystatechange = processLeftover;
    try {
        leftoverclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    leftoverclient.send();

}

function processLeftover() {

    if (leftoverclient.readyState < 4) {
    }
    else if (leftoverclient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (leftoverclient.status > 199 && leftoverclient.status < 300) {
            var data = leftoverclient.responseText;
            loadLeftover(data);
        }
    }
}

function loadLeftover(data) {
    var formJSON = JSON.parse(data)[0];

    leftoverlayer = L.geoJson(formJSON,
        {
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

                return L.marker(latlng, {icon: redMarker}).bindPopup(htmlString);
            },
        }).addTo(mymap);

}
