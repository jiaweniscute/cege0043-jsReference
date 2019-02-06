function startup(){
    document.addEventListener('DOMContentLoaded',function(){
        trackAndCircle();
        getEarthquakes();
        }, false);
}



function trackAndCircle(){
    trackLocation();
    addPointLinePoly();

}