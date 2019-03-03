function startup() {

    getPort();

}

//         document.addEventListener('DOMContentLoaded',function(){
//         trackAndCircle();
//         // getEarthquakes();
//         getFormData();
//         }, false);
// getPort();


function trackAndCircle() {
    trackLocation();
    addPointLinePoly();
    loadW3HTML();

}

function loadW3HTML() {
    w3.includeHTML();
}