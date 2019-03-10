var client;


function getFormData() {
    console.log('getFormData called',httpPortNumber);
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


