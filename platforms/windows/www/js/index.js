/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var map;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        cihaziharitadaGoster();
         yerTakipEt();
    } 
   
};

function yerGonder () {
   
}

function cihaziharitadaGoster() {



    map = document.getElementById('haritaFrameId').contentWindow.harita();
    if (map == undefined) {
        setInterval(cihaziharitadaGoster, 1000);
        console.log("map yok");
        return;
    }
    map.cihazinYerinigoster();
}

function yerTakipEt() {
    if (map == undefined) {
        setInterval(yerTakipEt, 1000);
        console.log("map yok");
        return;
    }
    var options = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true };
    navigator.geolocation.watchPosition(yerBlgisiBsariliGuncellendi, yerTakipEdilememeDurumu, options);
}

function yerTakipEdilememeDurumu(error) {
    alert(" yer biildirilemedi" + error);
}

 

var yerBlgisiBsariliGuncellendi = function (position) {

    var coords = position.coords;
    var latitudeYeni = coords.latitude;

    var longitudeYeni = coords.longitude;
    var yatayDeger = latitudeYeni - coords.latitude;
    var sapmaDegeri = 0.00001;
    var yatayDegisimis = -sapmaDegeri < yatayDeger && yatayDeger < sapmaDegeri;
    var dikeyDeger = longitudeYeni - coords.longitude;
    var dikeyDegisimis = -sapmaDegeri < dikeyDeger && dikeyDeger < sapmaDegeri;
    //if (!(coords && yatayDegisimis && dikeyDegisimis)) {
    //
    //    console.log("kordinat de�i�medi");
    //    return;
    //}
    var cihazPozisyon = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    map.cihazPozisyonGuncelle(cihazPozisyon);
  //  console.log("kordinat de�i�ti");
    positionGen = position;
    var label = device.platform + " - " + device.model;
    // construct an HTTP request
    var data = {
        latitude: latitudeYeni,
        longitude: longitudeYeni,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        speed: position.coords.speed,
   
        telefonLabel: label
    };

   // var json = httpPost("hello/lokasyon/guncelle", data);
    //cihazlariGuncelle(json);
};

app.initialize();