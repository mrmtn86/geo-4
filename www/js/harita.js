function harita() {
    var markers = [];
     
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        scrollwheel: false,
        disableDefaultUI: true,
        zoom: 10
    });
   
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


    this.cihazPozisyonGuncelle = function(pozisyon) {
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

