function startup() {

    getPort();


}


function trackAndCircle() {
    getFormData();
    trackLocation();
    startMenu();
    loadW3HTML();
    startMenu();

}

function loadW3HTML() {
    w3.includeHTML();
}