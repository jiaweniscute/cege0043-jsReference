function startMenu() {
    getNumCorrect();
    getRanking();
    getRankingFive();
}

// get number of questions that were answered correctly
var numclient;
var numcorrect;

//
function getNumCorrect() {
    numclient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/numcorrect/' + httpPortNumber;
    console.log('under numcorrect url:', url);
    numclient.open('GET', url);
    numclient.onreadystatechange = numResponse;
    numclient.send();

}

function numResponse() {
    if (numclient.readyState == 4) {
        numcorrect = JSON.parse(numclient.responseText)['num_questions'];
        document.getElementById('numcorrect').innerHTML = numcorrect;
    }
}


// Get Individual Ranking
var rankClient;

function getRanking() {
    rankClient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/ranking/' + httpPortNumber;
    console.log('under ranking url:', url);
    rankClient.open('GET', url);
    rankClient.onreadystatechange = rankResponse;
    rankClient.send();

}

function rankResponse() {
    if (rankClient.readyState == 4) {
        var rank = JSON.parse(rankClient.responseText)['rank'];
        document.getElementById('rank').innerHTML = rank;
    }
}

// Get Top 5 Ranking
var rankFiveClient;

function getRankingFive() {
    rankFiveClient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/rankingfive';
    console.log('under rankingfive url:', url);
    rankFiveClient.open('GET', url);
    rankFiveClient.onreadystatechange = rankFiveResponse;
    rankFiveClient.send();

}

function rankFiveResponse() {
    if (rankFiveClient.readyState == 4) {
        var rankfive = JSON.parse(rankFiveClient.responseText);
        getRankGraph(rankfive);
    }
}


function rankModal() {
    console.log('rankModal function activated')
    var modal = document.getElementById('rankModal');
    modal.style.display = "block";
    console.log('rankModel is already out')

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function getRankGraph(rankfive) {

    var i;
    urls = [];
    for (i = 0; i < rankfive.length; i++) {
        portnum = rankfive[i]['port_id'];
        urls.push(portnum);
    }

    var api = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/numcorrect/';
    let requests = urls.map(name => fetch(api + name));

    Promise.all(requests)
        .then(responses => {
            return responses;
        })
        // map array of responses into array of response.json() to read their content
        .then(responses => Promise.all(responses.map(r => r.json())))
        // all JSON answers are parsed: "users" is the array of them
        .then(scores => plotRankGraph(scores));
}

// code adapted from: https://www.chartjs.org/docs/latest/charts/bar.html
function plotRankGraph(raw) {
    var labels = [];
    var data = [];

    for (i = 0; i < raw.length; i++) {
        var label = raw[i]['port_id'];
        var datum = raw[i]['num_questions'];
        labels.push(label);
        data.push(datum);
    }


    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Number of Correctly Answered Questions",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data,
            }]
        },
        // Configuration options go here
        options: {}
    });

}

