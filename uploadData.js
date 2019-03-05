function startDataUpload() {
    var question_title = document.getElementById("question_title").value;
    var question_text = document.getElementById("question_text").value;
    var answer_1 = document.getElementById("answer_1").value;
    var answer_2 = document.getElementById("answer_2").value;
    var answer_3 = document.getElementById("answer_3").value;
    var answer_4 = document.getElementById("answer_4").value;
    var correct_answer = document.getElementById("correct_answer").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var postString = "question_title=" + question_title + "&question_text=" + question_text +
        "&answer_1=" + answer_1 + "&answer_2=" + answer_2 + "&answer_3=" + answer_3 + "&answer_4=" + answer_4 +
        "&correct_answer=" + correct_answer + "&latitude=" + latitude + "&longitude=" + longitude;

    var all_answers = [question_title, question_text, answer_1, answer_2, answer_3, answer_4, correct_answer, latitude, longitude];

    correct_answer_integer = Number(correct_answer);
    console.log(correct_answer_integer, typeof(correct_answer_integer))
    // check correct answer field, if pass, check if all fields are filled
    if (correct_answer_integer == 1 || correct_answer_integer == 2 || correct_answer_integer == 3 || correct_answer_integer == 4) {
        var count = 0;
        for (var i = 0; i < all_answers.length; i++) {
            if (all_answers[i] === "") {
                count += 1;
            }
        }
        if (count > 0) {
            document.getElementById("dataUploadResult").innerHTML = 'Error: Some fields are empty. ';
        }
        else {
            //processData(postString);
            console.log('data processed.')
        }

    }
    else {
        document.getElementById("dataUploadResult").innerHTML = 'Error: Correct Answer Field must be an integer. '
        console.log('not 1 -4')
    }
}


var client;  // the global variable that holds the request
function processData(postString) {
    client = new XMLHttpRequest();
    postString = postString + "&port_id=" + httpPortNumber;
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
    client.open('POST', url, true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUploaded;
    client.send(postString);
}


// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // change the DIV to show the response
        document.getElementById("dataUploadResult").innerHTML = 'Question added successfully.';
    }

}


