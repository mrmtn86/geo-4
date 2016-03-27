var map;

function harita() {
    var markers = [];


    function loadScript(src,callback){

        var script = document.createElement("script");
        script.type = "text/javascript";
        if(callback)script.onload=callback;
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
    }

    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpWwxqBtwp1qFHy3VuVV166TaCdP3-d7I&callback&callback=googleMapOlustur',
        function(){log('google-loader has been loaded, but not the maps-API ');});
    

    this.cihazinYerinigoster = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var cihazPozisyon = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map = new google.maps.Map(document.getElementById('map'), {
                    center: cihazPozisyon,
                    disableDefaultUI: true,
                    zoom: 16
                });
                cihazPozisyonAyarla(cihazPozisyon);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
        console.log(map);
    };

    this.cihazPozisyonGuncelle = function (pozisyon) {
        deleteMarkers();

        cihazPozisyonAyarla(pozisyon);
    };

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    function log(str){
        document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    function cihazPozisyonAyarla(pozison) {
        addMarker(pozison);
    }

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        map.setCenter(location);
        markers.push(marker);
        return marker;
    }


    return this;


}

function googleMapOlustur() {


    // if (google == undefined) {
    //     setInterval(googleMapOlustur, 1000);
    //     console.log("map yok");
    //     return;
    // }

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        scrollwheel: false,
        disableDefaultUI: true,
        zoom: 13
    });
};

