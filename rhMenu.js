function menuClicked(){
    alert("you clicked the menu")
}

function addUCLLogo(){
    document.getElementById("ucllogo").innerHTML="<img src='images/ucl.png'>"
}

// Get Individual Ranking
var rankClient;
function getRanking() {
    console.log('getRanking called');
    rankClient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/ranking/' + httpPortNumber;
    console.log('ranking url', url);
    rankClient.open('GET', url);
    rankClient.onreadystatechange = rankResponse;
    rankClient.send();

}

function rankResponse() {
    if (rankClient.readyState == 4) {
        var rank = JSON.parse(rankClient.responseText)['rank'];
        console.log('rank is', rank);
        document.getElementById('rank').innerHTML = rank;
    }
}

// Get Top 5 Ranking
var rankFiveClient;
function getRanking() {
    console.log('getRanking called');
    rankFiveClient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/ranking/' + httpPortNumber;
    console.log('ranking url', url);
    rankFiveClient.open('GET', url);
    rankFiveClient.onreadystatechange = rankFiveResponse;
    rankFiveClient.send();

}

function rankFiveResponse() {
    if (rankFiveClient.readyState == 4) {
        var rank = JSON.parse(rankFiveClient.responseText);
        console.log('rank is', rank);
    }
}



