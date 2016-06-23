// Project Bamboo v1

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bamboo' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('bamboo', ['ionic', 'ngCordova', 'ngCordovaBeacon', 'underscore'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //if(window.cordova && window.cordova.plugins.Keyboard) {

   //   $cordovaKeyboard.hideAccessoryBar(true);

   //   $cordovaKeyboard.disableScroll(true);
    //}
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

})
.controller('HomeCtrl',
  ['$scope', '$rootScope', '$ionicPlatform', '$cordovaBeacon', '$ionicPopup', 'beaconService', '_', '$timeout',
   function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup, beaconService, _, $timeout) {

    $scope.currentBeacon = {};
    var sample1 = {
        major: 60853,
        data: []
    };

     var sample2 = {
       major: 55086,
       data: []
     };

     var logic = function(rssi, major) {
       if (rssi !== 0 && rssi >= -65 && rssi <= -50) {
         //$ionicPopup.alert({
         //  title: 'Beacon Very Near',
         //  template: 'Major: ' + major
         //}).then(function (res) {
         //  console.log("Beacon : " + major + ", rssi: " + rssi);
         //});
         $scope.currentBeacon = beaconService.getBeaconData(major);
       }
     }

     var getAvgRSSI = function(arr) {
       console.log(arr);
         var sum = 0;
         for(index in arr) {
            sum = sum + arr[index];
         }
         var avgRSSI = sum/(arr.length);
       console.log("Avg: " + avgRSSI);
         return avgRSSI;
     }

     var rssi, major;

    $ionicPlatform.ready(function() {

        $cordovaBeacon.requestAlwaysAuthorization();

        //{"major":55086,"minor":10743,"uuid":"B9407F30-F5F8-466E-AFF9-25556B57FE6D","accuracy":0.02,"rssi":-45,"proximity":"ProximityImmediate"}
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {

            for(index in pluginResult.beacons){

                rssi = pluginResult.beacons[index].rssi;
                major = pluginResult.beacons[index].major;
                if(rssi !== 0){
                    if(major === 60853){
                        if(sample1.data.length === 5){
                            console.log(major);
                            var cloneArr = sample1.data;
                            logic(getAvgRSSI(cloneArr), major);
                              sample1.data = [];
                        }
                        sample1.data.push(rssi);
                    }
                    else{
                        if(sample2.data.length === 5){
                            console.log(major);
                          var cloneArr = sample2.data; //_.clone(sample2.data);
                            logic(getAvgRSSI(cloneArr), major);
                            sample2.data = [];
                        }
                        sample2.data.push(rssi);
                    }
                  console.log(major +", "+rssi);
                }

            }
          console.log("*******");
          console.log("1: "+sample1.data.length );
          console.log("2: "+sample2.data.length );

            $scope.$apply();
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));

    });

}])
.factory('beaconService', function() {
    var beacons = [{
      name: 'mint',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      major: 29338,
      minor: 33270,
      identifier: 'ebfa81f6729a',
      content: {
        landmark: "Empty",
        text: "This is mint beacon",
        image: "",
        directions: "These are the directions"
      }
    },{
      name: 'ice',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      major: 60853,
      minor: 59718,
      identifier: 'e60de946edb5',
      content: {
        landmark: "SAU Building",
        text: "Welcome to the student alumni union. This is where you can find multiple campus resources while also grab great food" +
        "with friends.",
        image: "img/sau.jpg",
        directions: "These are the directions"
      }
    },{
      name: 'blueberry',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      major: 55086,
      minor: 10743,
      identifier: 'ebfa81f6729a',
      content: {
        landmark: "Gordon Field House",
        text: "Welcome to Gordon Field House. Our gym along with other fitness resources are all located in here. RIT has an olympic" +
        " sized aquatics arena along with many multi purpose courts.",
        image: "img/gym.jpg",
        directions: "These are the directions"
      }
    }];

    function findBeacon(major) {
      for (item in beacons){
        if(beacons[item].major === major){
          return beacons[item];
        }
      }
    };

    return {
      getBeaconData: findBeacon
    };

});

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);




