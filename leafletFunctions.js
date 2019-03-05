var client;


function getFormData() {
    console.log('getFormData called', httpPortNumber);
    client = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getQuizPoints/' + httpPortNumber;
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


var formLayer;

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
                htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
                htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
                htmlString = htmlString + "</div>";
                return L.marker(latlng).bindPopup(htmlString);
            },
        }).addTo(mymap);


    mymap.fitBounds(formLayer.getBounds());
}


function checkAnswer(questionID) {

    var answer = document.getElementById("answer" + questionID).innerHTML;
    // now check the question radio buttons
    var correctAnswer = false;
    var answerSelected = 0;
    for (var i = 1; i < 5; i++) {
        if (document.getElementById(questionID + "_" + i).checked) {
            answerSelected = i;
        }
        if ((document.getElementById(questionID + "_" + i).checked) && (i == answer)) {

            alert("Correct! Move on to the next point.");
            correctAnswer = true;
        }
    }
    if (correctAnswer === false) {
        // they didn't get it right
        alert("Wrong! Re-do the question by clicking on the point.");
    }
    // now close the popup
    mymap.closePopup();
    // the code to upload the answer to the server would go here
    // call an AJAX routine using the data
    // the answerSelected variable holds the number of the answer
    //that the user picked

}


function closestFormPoint(position) {

    var dist = 0.005; // 5 metres
    var closestFormPoint = 0;

    var userlat = position.coords.latitude;
    var userlng = position.coords.longitude;


    formLayer.eachLayer(function (layer) {
        var distance = calculateDistance(userlat, userlng, layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        console.log(distance)
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

