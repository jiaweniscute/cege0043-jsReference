function startup() {
    getPort();
}

function trackAndCircle() {
    getFormData();
    trackLocation();
    startMenu();
    loadW3HTML();

}

function loadW3HTML() {
    w3.includeHTML();
}