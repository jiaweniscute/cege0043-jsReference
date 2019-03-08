function startMenu() {
    getRanking();
    getRankingFive();
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
function getRankingFive() {
    console.log(httpPortNumber);
    rankFiveClient = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + '/rankingfive';
    rankFiveClient.open('GET', url);
    rankFiveClient.onreadystatechange = rankFiveResponse;
    rankFiveClient.send();

}

function rankFiveResponse() {
    if (rankFiveClient.readyState == 4) {
        var rankfive = JSON.parse(rankFiveClient.responseText);
        console.log('rank five is', rankfive);
    }
}


// function rankModal() {
//     console.log('rankModal function activated')
//     var modal = document.getElementById('rankModal');
//     modal.style.display = "block";
//     console.log('rankModel is already out')
//
//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];
//
//     span.onclick = function () {
//         modal.style.display = "none";
//     };
//
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
//
// }

// // build rank graph
// function getRankGraph() {
//     getRankingFive();
//     var top_five = JSON.parse(rankFiveClient.responseText);
//     console.log('under get rankgraph function');
//     console.log(top_five);
//
// }


//     var api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
//     document.addEventListener("DOMContentLoaded", function (event) {
//         fetch(api)
//             .then(function (response) {
//
//                 return response.json();
//
//             })
//             .then(function (data) {
//                 var parsedData = parseData(data)
//                 drawChart(parsedData);
//             })
//     });
// }
//
// function parseData(data) {
//     var arr = [];
//     for (var i in data.bpi) {
//         arr.push(
//             {
//                 date: new Date(i), //date
//                 value: +data.bpi[i] //convert string to number
//             });
//     }
//     return arr;
// }
//
//
// function drawChart(data) {
//     var svgWidth = 600, svgHeight = 400;
//     var margin = {top: 20, right: 20, bottom: 30, left: 50};
//     var width = svgWidth - margin.left - margin.right;
//     var height = svgHeight - margin.top - margin.bottom;
//     var svg = d3.select('svg')
//         .attr("width", svgWidth)
//         .attr("height", svgHeight);
//     var g = svg.append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")"
//         );
//
//     var x = d3.scaleTime().rangeRound([0, width]);
//     var y = d3.scaleLinear().rangeRound([height, 0]);
//     var line = d3.line()
//         .x(function (d) {
//             return x(d.date)
//         })
//         .y(function (d) {
//             return y(d.value)
//         })
//     x.domain(d3.extent(data, function (d) {
//         return d.date
//     }));
//     y.domain(d3.extent(data, function (d) {
//         return d.value
//     }));
//     g.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .select(".domain")
//         .remove();
//
//     g.append("g")
//         .call(d3.axisLeft(y))
//         .append("text")
//         .attr("fill", "#000")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Price ($)");
//     g.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-linejoin", "round")
//         .attr("stroke-linecap", "round")
//         .attr("stroke-width", 1.5)
//         .attr("d", line);
//
// }