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
    function homeController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {




        var vm = this;
        vm.class = 'homeController';


        var marker;
        $scope.positions =[];
        $scope.search = {
            latitude:'',
            longitude:'',
            page:'1'
        };
        $scope.selection = "banner";
       // $log.debug($scope.selection);
        $scope.isFav = false;
        $scope.urlRest = '';
        //property list
        $scope.user = null;
        $scope.users = null;
        $scope.currentNavItem = "buy";
        $rootScope.propertyArr = [];

  $scope.loadUsers = function() {
    // Use timeout to simulate a 650ms request.
    return $timeout(function() {
      $scope.users =  $scope.users  || [
        { id: 1, name: 'Residential' },
        { id: 2, name: 'Commercial' }
      ];
    }, 650);
  };


        $scope.isFavTog = function(Prop){

            Prop.isFav = {false:true, true:false}[Prop.isFav];
        }

        $scope.urlGet = 'http://52.42.99.192/Testimonials/getTestimonials/';
                $http({
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



        $scope.logOut = function(){
            //alert('working')
            $rootScope.myPromise = $timeout(function(){
            $location.path('/');
            $rootScope.loggedIn = false;
            }, 1000)

        }

        $scope.switchBanner = function(){
           $timeout(function(){
                $scope.selection = "banner";
                }, 1000)
        }
        $scope.placeChanged = function() {
            vm.place = this.getPlace();
            $scope.latLong = vm.place.geometry.location;
        }
        $scope.switchMap = function(){
            $scope.selection = "map";
            NgMap.getMap().then(function(map) {
                vm.map = map;

                $timeout(function(){
                    $scope.latLong = (map.getCenter());
                    $scope.search.latitude = $scope.latLong.lat();
                    $scope.search.longitude = $scope.latLong.lng();
                    getProperties();
                }, 200);
            });
        }

        var getProperties = function(){

                $scope.urlRest = 'http://52.42.99.192/Property/searchPropertiesInLocation/';
                httpService.getData($scope.urlRest, $scope.search).then(function(result) {
                if(result.resCode == 0){
                    $rootScope.propertyArr = result.response.propertyArray;
                    $scope.positions = [];
                    $rootScope.propertyArr.forEach(function(val, i){
                        $log.debug(val.latitude +' ' +val.longitude);
                        $scope.positions.push({pos:[val.latitude, val.longitude]});
                    });
                    //$mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));

                    }else{
                        $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                        //alert(result.resStr);
                    }
                });

        }

        //$rootScope.hideFooter = $location.path() === '/signUp';
        //alert($rootScope.hideFooter);

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class );
            //$scope.message = 'Hello,  Welcome to Amakkn!!';
        }
    }
})();
