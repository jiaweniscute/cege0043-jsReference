function startup(){
    document.addEventListener('DOMContentLoaded',function(){
        trackAndCircle();
        getEarthquakes();
        }, false);
    getPort();
}



function trackAndCircle(){
    trackLocation();
    addPointLinePoly();
    loadW3HTML();

}

function loadW3HTML() {
       w3.includeHTML();
}