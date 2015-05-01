# Bluetooth Low Energy (BLE) module for cordova

This module (and matching widget) allows users to detect when users are near your bluetooth device (such as an [estimote](http://estimote.com)) 

## Configuration
You need to configure the following for the module to work:
 - add the checkin widget to the mobile phone's homepage
 - configure widget: set the MAC address to the address of your bluetooth beacon

Additionally, you will need to manually build your cordova app and include the following to additional modules:
 - com.megster.cordova.ble
 - de.appplant.cordova.plugin.background-mode
