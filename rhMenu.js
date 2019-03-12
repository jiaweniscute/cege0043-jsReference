function startMenu() {
    getNumCorrect();
    getRanking();
    getRankingFive();
}

// get number of questions that were answered correctly
var numclient;
var numcorrect;

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
    var modal = document.getElementById('rankModal');
    modal.style.display = "flex";
    var modal_overlay = document.getElementById('modal-overlay');
    modal_overlay.style.display = "flex";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
        modal_overlay.style.display = "none";

    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal_overlay) {
            modal.style.display = "none";
            modal_overlay.style.display = "none";

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

// help modal
function helpModal() {
    var modal = document.getElementById('helpModal');
    modal.style.display = "flex";
    var modal_overlay = document.getElementById('modal-overlay');
    modal_overlay.style.display = "flex";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[1];

    span.onclick = function () {
        modal.style.display = "none";
        modal_overlay.style.display = "none";

    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal_overlay) {
            modal.style.display = "none";
            modal_overlay.style.display = "none";

        }
    };

    document.getElementById('helpModalContent').innerHTML =
        '<b>Aim of the game</b><br>Walk within 20m of any question point to trigger it. Touch the question point if it is not triggered.<br>Answer them right and win points.<br><br>' +
        '<b>Marker Colours</b><br>Black: Your position<br>Blue: Your Question Points<br>Red: Incorrectly Answered Questions<br>Green: Correctly Answered Questions<br>Pink: Question Points Set by Other Users' +
        '<br><br><b>Navigation Bar</b><br>Top 5 Rankings: See the top 5 players in the game<br><br>' +
        'Show/Hide 5 Closest Questions: See the closest 5 questions from your location (includes question points from other users). You will be able to attempt these questions<br><br>' +
        'Show/Hide Last 5 Questions: See the last 5 questions you attempted. You can only view these questions and not answer them.<br><br>' +
        'Show/Hide Incorrectly Answered Questions Only: See the questions you have answered incorrectly. You can only view these questions and not answer them.'
}