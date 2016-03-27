function harita() {
    const YOLDA = 'yolda';
    var markers = [];
    var cihazPozisyonGecmisi = [];
    var map;
    var infoWindow;

    function loadScript(src, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (callback)script.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
    }

    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpWwxqBtwp1qFHy3VuVV166TaCdP3-d7I',
        function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 38.365115, lng: 27.1623888},
                scrollwheel: false,
                disableDefaultUI: true,
                zoom: 18
            });
            log('google-loader has been loaded, but not the maps-API ');
        });


    this.yerTakipEt = function () {
        var options = {maximumAge: 0, timeout: 20000, enableHighAccuracy: true};

        navigator.geolocation.watchPosition(cihazinPozisyonDegisti, yerTakipEdilememeDurumu, options);
    };

    function bildirilemeyenPozisyonGecmisiniGetir() {
        var bildirilemeyenPozisyonGecmisi = [];
        var arrayLength = cihazPozisyonGecmisi.length;
        for (var i = 0; i < arrayLength; i++) {
            var cihazPozisyonu = cihazPozisyonGecmisi[i];
            if (cihazPozisyonu.sunucuyaGonderildi) {
                break;
            }
            cihazPozisyonu.sunucuyaGonderildi = YOLDA;

            var pozisyongecmisi = {
                tarih: cihazPozisyonu.tarih,
                pozisyon: cihazPozisyonu.pozisyon
            };

            bildirilemeyenPozisyonGecmisi.push(pozisyongecmisi)
        }

        return bildirilemeyenPozisyonGecmisi;
    }

    function bildirimBasarili() {
        var arrayLength = cihazPozisyonGecmisi.length;
        for (var i = 0; i < arrayLength; i++) {
            var cihazPozisyonu = cihazPozisyonGecmisi[i];
            if (cihazPozisyonu.sunucuyaGonderildi) {
                break;
            } else if (cihazPozisyonu.sunucuyaGonderildi == YOLDA) {
                cihazPozisyonu.sunucuyaGonderildi = true;
            }
        }
    }

    this.yerBildir = function () {


        var anlikPozisyonList = bildirilemeyenPozisyonGecmisiniGetir();
        if (anlikPozisyonList.length > 1) {
            var cihazYerBilgileri = {
                cihazId: sessionIdGetir(),
                anlikPozisyonList: anlikPozisyonList
            };

            httpPost("hello/lokasyon/guncelle", cihazYerBilgileri);
            bildirimBasarili();
            setInterval(this.yerBildir, 5000);
        }
    };

    function yerTakipEdilememeDurumu(error) {
        handleLocationError('yer takip edilemiyor', infoWindow, map.getCenter());
        console.log(error.message);
    }

    function cihazinPozisyonDegisti(position) {
        var cihazPozisyon = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        cihazPozisyonGuncelle(cihazPozisyon);
    }

    // function yerBlgisiBsariliGuncellendi(position, deviceInfo) {
    //
    //     var coords = position.coords;
    //
    //     var latitudeYeni = coords.latitude;
    //     var longitudeYeni = coords.longitude;
    //     var yatayDeger = latitudeYeni - coords.latitude;
    //     var sapmaDegeri = 0.00001;
    //     var yatayDegisimis = -sapmaDegeri < yatayDeger && yatayDeger < sapmaDegeri;
    //     var dikeyDeger = longitudeYeni - coords.longitude;
    //     var dikeyDegisimis = -sapmaDegeri < dikeyDeger && dikeyDeger < sapmaDegeri;
    //     //if (!(coords && yatayDegisimis && dikeyDegisimis)) {
    //     //
    //     //    console.log("kordinat de�i�medi");
    //     //    return;
    //     //}
    //     var cihazPozisyon = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     };
    //     this.cihazPozisyonGuncelle(cihazPozisyon);
    //     //  console.log("kordinat de�i�ti");
    //     positionGen = position;
    //     var data = {
    //         latitude: latitudeYeni,
    //         longitude: longitudeYeni,
    //         altitude: position.coords.altitude,
    //         accuracy: position.coords.accuracy,
    //         altitudeAccuracy: position.coords.altitudeAccuracy,
    //         speed: position.coords.speed,
    //         sessionId: sessionId,
    //         telefonLabel: deviceInfo
    //     };
    //
    //
    //     var json = httpPost("hello/lokasyon/guncelle", data);
    //     //cihazlariGuncelle(json);
    // };


    this.yerGuncelle = function (telefon) {

        deleteMarkers();

        var yerList = telefon.yerList;
        var arrayLength = yerList.length;
        for (var i = 0; i < arrayLength; i++) {
            var yer = yerList[i];
            var pos = {
                lat: Number(yer.latitude),
                lng: Number(yer.longitude)
            };
            addMarker(pos);
        }
    };

    this.cihazinYerinigoster = function () {

        if (navigator.geolocation) {
            var successCallback = function (position) {
                var cihazPozisyon = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                cihazPozisyonAyarla(cihazPozisyon);
            };
            navigator.geolocation.getCurrentPosition(successCallback, function () {
                handleLocationError('Error: The Geolocation service failed.', infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError('Error: Your browser doesn\'t support geolocation.', infoWindow, map.getCenter());
        }

    };

    cihazPozisyonGuncelle = function (pozisyon) {
        deleteMarkers();
        cihazPozisyonGecmisineSakla(pozisyon);
        cihazPozisyonAyarla(pozisyon);
    };

    // Sets the harita on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the harita, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    function log(str) {
        document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('[' + new Date().getTime() + ']\n' + str + '\n\n'));
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function handleLocationError(mesaj, infoWindow, pos) {
        if (infoWindow == undefined) {
            infoWindow = new google.maps.InfoWindow({map: map});
        }
        infoWindow.setPosition(pos);
        infoWindow.setContent(mesaj);
    }

    function cihazPozisyonAyarla(pozison) {
        addMarker(pozison);
    }

    function cihazPozisyonGecmisineSakla(pozison) {
        var pozisyongecmisi = {
            tarih: Date.now(),
            pozisyon: pozison,
            sunucuyaGonderildi: false
        };
        cihazPozisyonGecmisi.unshift(pozisyongecmisi);
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