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

}

