// initialise menu
function initMenu() {
    dailypart();
    alldailypart();
    fivemostdifficult();
}

// get my daily participation graph
var dailyclient;

function dailypartmodal() {
    var modal = document.getElementById('dailypartmodal');
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

function dailypart() {
    dailyclient = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/dailyparticipation/' + httpPortNumber;
    dailyclient.open("GET", url, true);
    dailyclient.onreadystatechange = processdailypart;
    try {
        dailyclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    dailyclient.send();
}

function processdailypart() {
    // while waiting response from server

    if (dailyclient.readyState < 4) {
    }
    else if (dailyclient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (dailyclient.status > 199 && dailyclient.status < 300) {
            var data = JSON.parse(dailyclient.responseText);
            drawdailychart(data);
        }
    }
}

function drawdailychart(d) {
    var labels = [];
    var questions = [];
    var correct = [];
    var i;

    for (i = 0; i < d.length; i++) {
        var l = d[i]['day'];
        var q = d[i]['questions_answered'];
        var c = d[i]['questions_correct'];
        labels.push(l);
        questions.push(q);
        correct.push(c);
    }

    labels = labels.reverse();
    questions = questions.reverse();
    correct = correct.reverse();

    var ctx = document.getElementById("dailypartchart").getContext("2d");

    var data = {
        labels: labels,
        datasets: [
            {
                label: "No. of Questions Answered",
                backgroundColor: "#38AADD",
                data: questions
            },
            {
                label: "No. of Correctly Answered Questions",
                backgroundColor: "#72B026",
                data: correct
            }

        ]
    };

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            }
        }
    });

}

// get overall daily participation graph

var alldailyclient;

function alldailypartmodal() {
    var modal = document.getElementById('alldailypartmodal');
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
    }

}

function alldailypart() {
    alldailyclient = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/dailyparticipationall';
    alldailyclient.open("GET", url, true);
    alldailyclient.onreadystatechange = processalldailypart;
    try {
        alldailyclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    alldailyclient.send();
}

function processalldailypart() {
    // while waiting response from server

    if (alldailyclient.readyState < 4) {
    }
    else if (alldailyclient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (alldailyclient.status > 199 && alldailyclient.status < 300) {
            var data = JSON.parse(alldailyclient.responseText);
            drawalldailychart(data);
        }
    }
}

function drawalldailychart(d) {
    var labels = [];
    var questions = [];
    var correct = [];
    var i;

    for (i = 0; i < d.length; i++) {
        var l = d[i]['day'];
        var q = d[i]['questions_answered'];
        var c = d[i]['questions_correct'];
        labels.push(l);
        questions.push(q);
        correct.push(c);
    }

    labels = labels.reverse();
    questions = questions.reverse();
    correct = correct.reverse();

    var ctx = document.getElementById("alldailypartchart").getContext("2d");

    var data = {
        labels: labels,
        datasets: [
            {
                label: "No. of Questions Answered",
                backgroundColor: "#38AADD",
                data: questions
            },
            {
                label: "No. of Correctly Answered Questions",
                backgroundColor: "#72B026",
                data: correct
            }

        ]
    };

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            }
        }
    });

}

// get 5 most difficult questions

var fivemostclient;

function fivemostmodal() {
    var modal = document.getElementById('fivemostmodal');
    modal.style.display = "flex";
    var modal_overlay = document.getElementById('modal-overlay');
    modal_overlay.style.display = "flex";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[2];

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

function fivemostdifficult() {
    fivemostclient = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/getfivemost';
    fivemostclient.open("GET", url, true);
    fivemostclient.onreadystatechange = processfivemost;
    try {
        fivemostclient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e) {
    }
    fivemostclient.send();
}

function processfivemost() {
    // while waiting response from server

    if (fivemostclient.readyState < 4) {
    }
    else if (fivemostclient.readyState === 4) { // 4 = Response from server has been completely loaded.
        if (fivemostclient.status > 199 && fivemostclient.status < 300) {
            var data = JSON.parse(fivemostclient.responseText);
            htmlstring = "<ol>\n" +
                "  <li>" + data[0]['question_text'] + "</li>\n" +
                "  <li>" + data[1]['question_text'] + "</li>\n" +
                "  <li>" + data[2]['question_text'] + "</li>\n" +
                "  <li>" + data[4]['question_text'] + "</li>\n" +
                "  <li>" + data[4]['question_text'] + "</li>\n" +
                "</ol>"

            document.getElementById('fivemostbody').innerHTML = htmlstring;
        }
    }
}


// helpModal

function helpModal() {
    var modal = document.getElementById('helpModal');
    modal.style.display = "flex";
    var modal_overlay = document.getElementById('modal-overlay');
    modal_overlay.style.display = "flex";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[3];

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
        '<b>Set Question Points</b><br>Click anywhere on the map to obtain coordinates for question points.<br>Fill in the question form below the map to set a question point.<br><br>' +
        '<b>Marker Colours</b><br>Blue: Your Question Points<br>Pink: Question Points Set by Other Users' +
        '<br><br><b>Navigation Bar</b><br>My Daily Participation: See how many questions you clock for the past week<br><br>' +
        'Daily Participation Across Users: See how many questions are clocked for the past week across the board<br><br>' +
        'Add/Remove Questions by Other Users: See question points set by other users<br><br>' +
        '5 Most Difficult Questions: See the top 5 most difficult questions (highest number of incorrect answers)'
}