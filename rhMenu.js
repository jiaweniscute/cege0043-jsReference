function startMenu(){
    dailypart();

}

function dailypartmodal() {
    var modal = document.getElementById('dailypartmodal');
    modal.style.display = "block";


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

var dailyclient;

function dailypart() {
    dailyclient = new XMLHttpRequest();

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/dailyparticipation/' + httpPortNumber;
    console.log('url:', url)
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
