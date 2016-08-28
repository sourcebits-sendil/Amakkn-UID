/**
 * @author Sendil
 * @since 7/27/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('homeCtrl', homeController);

    /* @ngInject */
    function homeController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope) {
        var vm = this;
        vm.class = 'homeController';

        $scope.selection = "banner";
       // $log.debug($scope.selection);
        $scope.urlGet = '';
        //property list
        $scope.user = null;
  $scope.users = null;
  $scope.loadUsers = function() {
    // Use timeout to simulate a 650ms request.
    return $timeout(function() {
      $scope.users =  $scope.users  || [
        { id: 1, name: 'Residential' },
        { id: 2, name: 'Commercial' }
      ];
    }, 650);
  };


            $scope.urlGet = 'http://52.42.99.192/Testimonials/getTestimonials/';


        $rootScope.myPromise = $http({
                    method : "GET",
                    url : $scope.urlGet})
                .then(function mySucces(result) {
                    if(result.data.resCode == 0){

                        var arr = [];
                            arr = result.data.response.testimonialArray;
                        //alert('got data' + arr)
                    $scope.userFeed = arr;
                }else{
                    alert(result.data.resCode);
                }
             });


        // --- google map with current positions --------

           $timeout(function(){
               /*if(!!navigator.geolocation) {

	    		var map;

		    	var mapOptions = {
		    		zoom: 15,
		    		mapTypeId: google.maps.MapTypeId.ROADMAP
		    	};

		    	map = new google.maps.Map(document.getElementById('google_canvas'), mapOptions);

	    		$rootScope.myPromise =  navigator.geolocation.getCurrentPosition(function(position) {

		    		var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		    		var infowindow = new google.maps.InfoWindow({
		    			map: map,
		    			position: geolocate,
		    			content:
		    				'<h1>Location pinned from HTML5 Geolocation!</h1>' +
		    				'<h2>Latitude: ' + position.coords.latitude + '</h2>' +
		    				'<h2>Longitude: ' + position.coords.longitude + '</h2>'
		    		});

		    		map.setCenter(geolocate);

	    		});

	    	} else {
	    		document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
	    	}*/



        },1000);
        // ---Ends google map with current positions --------

        //toast
         $scope.showToast1 = function() {
                  $mdToast.show(
                     $mdToast.simple()
                        .textContent('Hello World!')
                        .hideDelay(3000)
                  );
               };
         $scope.showToast2 = function() {
                  var toast = $mdToast.simple()
                     .textContent('Hello World!')
                     .action('OK')
                     .highlightAction(false);
                  $mdToast.show(toast).then(function(response) {
                     if ( response == 'ok' ) {
                        alert('You clicked \'OK\'.');
                     }
                  });
               }

         $scope.openToast = function($event){
            $mdToast.show($mdToast.simple().textContent('Hello'));
            // Could also do $mdToast.showSimple('Hello');
         };

        $scope.logOut = function(){
            //alert('working')
            $rootScope.myPromise = $timeout(function(){
            $location.path('/');
            $rootScope.loggedIn = false;
            }, 1000)

        }

        $scope.switchBanner = function(){
            $rootScope.myPromise = $timeout(function(){
                $scope.selection = "banner";
                }, 1000)
        }

        $scope.switchMap = function(){
            $rootScope.myPromise = $timeout(function(){
                $scope.selection = "map";

            function success(position) {
              var mapcanvas = document.createElement('div');
              mapcanvas.id = 'mapcontainer';
              mapcanvas.style.height = '400px';
              mapcanvas.style.width = '600px';

              document.querySelector('article').appendChild(mapcanvas);

              var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

              var options = {
                zoom: 15,
                center: coords,
                mapTypeControl: false,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

              var marker = new google.maps.Marker({
                  position: coords,
                  map: map,
                  title:"You are here!"
              });
            }

                if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(success);
            } else {
              error('Geo Location is not supported');
            }

            }, 1000)
        }

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class );
            //$scope.message = 'Hello,  Welcome to Amakkn!!';
        }
    }
})();
