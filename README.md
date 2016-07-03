##Project Setup

1. Install ngCordova library. This allows you to use AngularJS for Cordova/PhoneGap applications.

        $ bower install ngCordova
        
2. Add target platform
   
        ionic platform add ios
 
3. Install the iBeacon plugin for ngCordova.

        cordova plugin add com.unarin.cordova.beacon
    
        Details: [http://ngcordova.com/docs/plugins/beacon/](http://ngcordova.com/docs/plugins/beacon/)
    
4. Add this AngularJS wraper to your project. It allows AngularJS to work with Ionic framework.
    
        [Reference Article](https://raw.githubusercontent.com/nraboy/ng-cordova-beacon/master/dist/ng-cordova-beacon.min.js)
    
  Make sure to test your app on a device as simulators won't detect the Estimotes.
  
  To get list of installed emulators:
        cordova emulate ios --list
    
  To run in specific ios emulator:
        cordova emulate ios --target="iPhone-6s, 9.3"