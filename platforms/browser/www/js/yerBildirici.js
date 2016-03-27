/**
 * Created by mtn on 26.03.2016.
 */

//var serviceIp = "http://10.10.4.35:8080/rest/";
var serviceIp = "http://192.168.1.204:8080/rest/";
//var serviceIp ="http://213.14.191.24:90/rest/";

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();

    //xmlHttp.open("GET", +theUrl, false); // false for synchronous request
    xmlHttp.open("GET", serviceIp + theUrl, false); // false for synchronous request
    xmlHttp.send(null);

    if (xmlHttp.responseText)
        return JSON.parse(xmlHttp.responseText);
}

function httpPost(theUrl, param) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("POST", serviceIp + theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    var jsonParam = JSON.stringify(param);

    //  console.log("post " + jsonParam  + "  tel : "  +jsonParam.telefonId );
    xmlHttp.send(jsonParam);

    return JSON.parse(xmlHttp.responseText);
}


function sessionIdGetir() {
    var storage = window.localStorage;
    var key = 'sessionId';
    var sessionId = storage.getItem(key);
    if (sessionId == undefined) {
        sessionId = Math.floor((Math.random() * 10000000) + 1);
        storage.setItem(key, sessionId)
    }

    console.log('session Id : '+ sessionId);

    return sessionId;
}