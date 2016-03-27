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

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        cihaziharitadaGoster();
        yerTakipEt();
        sistemdekiKullanicilariGoster();
    }
};

function tekrarliIslem(metod) {

    var cagirilmaSayisi = 1;

    var tekrarEt  = function () {
        var metodBasariliCalisti = metod();

        if(!metodBasariliCalisti){
            var delay = 100 * cagirilmaSayisi * cagirilmaSayisi;
            ++cagirilmaSayisi;
            console.log("tekrarli islem deneme sayisi : " + cagirilmaSayisi + " beklenecek sure :  " + delay + " ms");
            setTimeout(tekrarEt, delay);
        }
    };
    tekrarEt();
}


function cihaziharitadaGoster() {
    var goster = function () {
        harita =  document.getElementById('haritaFrameId').contentWindow.harita();
        return harita != undefined;
    };
    tekrarliIslem(goster);
}

var harita;
function sistemdekiKullanicilariGoster() {
    var result = httpGet("hello/" + sessionIdGetir());
    cihazlariGuncelle(result);
}

function cihazlariGuncelle(json) {
    var letters = "";

  var telefonlar = json.telefonList;
    for (var i = 0; i < telefonlar.length; i++) {
        letters += "<button onclick=elemanGetir('" + telefonlar[i].sessionId + "')>" + telefonlar[i].label + "</button>";
    }
    document.getElementById("telefonlar").innerHTML = letters;
}

var takipEdilenTelefon;

function elemanGetir(telefonId) {
    takipEdilenTelefon = telefonId;
    setInterval(myTimer, 5000);
}


function myTimer() {

    var telefon = httpGet("hello/telefon-bilgisi-getir/" + takipEdilenTelefon);
    console.log("eleman getir telefoon " + telefon.telefonId);

    harita.yerGuncelle(telefon);
}


function yerGonder() {
    harita.yerBildir();
}


function yerTakipEt() {
    var deviceInfo = device.platform + " - " + device.model;
    harita.yerTakipEt();
}

app.initialize();