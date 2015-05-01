/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    Documentation
    ========================
    Checkin widget. This widget calls home when a particular beacon is encountered.
*/

define("beaker/widget/checkin", ["dojo/_base/declare", "mxui/widget/_WidgetBase"
], function (declare, _WidgetBase) {
    'use strict';

    return declare("beaker.widget.checkin", [_WidgetBase], {
        postCreate: function() {
            window.beaker = { interval: this.interval, deviceAddress: this.deviceAddress };
        },
    });
});
document.addEventListener('deviceready', function () { 
    if (window.cordova) {
        function onEncounterDevice(device) {
            if (device.address == window.beaker.deviceAddress) {
                var url = window.mx.appUrl + "checkin/";
                var data = JSON.stringify({
                    user : mx.session.getUserName(),
                    device : device.address
                });
                var request = new XMLHttpRequest();
                request.open("POST", url, true);
                request.send(data);
            }    
        }
    
        function startScan() { 
            if (window.beaker) {
                setInterval(function () { 
                    evothings.ble.startScan(onEncounterDevice, function(error) { console.error("Error" + error); });
                    setTimeout(evothings.ble.stopScan, 3000);
                }, window.beaker.interval);
            }
        }    

        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.onactivate = startScan;
    }
}, false);
