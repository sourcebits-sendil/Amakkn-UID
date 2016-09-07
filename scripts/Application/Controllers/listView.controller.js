/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('listViewController', listViewController);

    /* @ngInject */
    function listViewController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {
        var vm = this;
        vm.class = 'listViewController';
        $scope.propertiesData = null;

        activate();

        //////////////

        function activate() {
            //$log.debug('Activating ' + vm.class);
        }
        $scope.placeChanged = function() {
            $rootScope.latLong = null;
            $rootScope.search.latitude = null;
            $rootScope.search.longitude = null;
            vm.place = this.getPlace();
            $rootScope.latLong = vm.place.geometry.location;
            $rootScope.search.latitude = $rootScope.latLong.lat();
            $rootScope.search.longitude = $rootScope.latLong.lng();
            //alert($rootScope.search.latitude);
        }
        $scope.propertyList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/searchPropertiesInLocation/';
            //$log.debug($scope.userForm.code +' '+ $scope.userForm.phone );
            //var param = {"latitude":"12.986926","longitude":"77.687130","page" : "1"};
            //$log.debug($rootScope.search.latitude +' '+ $rootScope.search.longitude);
            $rootScope.myPromise = httpService.getData($scope.urlRest, $rootScope.search).then(function(result) {
                if(result.resCode == 0){
                //debugger;
                $scope.propertiesData = result.response.propertyArray;
                $rootScope.propertyArr = result.response.propertyArray;
                $scope.propertiesCount = result.response.totalCount;
                $rootScope.positions = [];
                $rootScope.propertyArr.forEach(function(val, i){
                    //$log.debug(val.latitude +' ' +val.longitude);
                    //$log.debug(val.price)
                    $rootScope.positions.push({pos:[val.latitude, val.longitude], price: ('$' +val.price.price/1000 + 'k')});

                });
                }
            });
        }

        $scope.updateMap = function(){
            NgMap.getMap().then(function(map) {
                vm.map = map;
                vm.map.setCenter($rootScope.latLong);
                $scope.propertyList();
            })
        }
            NgMap.getMap().then(function(map) {
                vm.map = map;
            //alert($rootScope.search.latitude);
                $timeout(function(){
                    //alert($rootScope.search.latitude);
                    if($rootScope.search.latitude == ''){
                        $rootScope.latLong = (map.getCenter());
                        $rootScope.search.latitude = $scope.latLong.lat();
                        $rootScope.search.longitude = $scope.latLong.lng();
                    }else{
                        vm.map.setCenter($rootScope.latLong);
                    }
                    $scope.propertyList();
                }, 200);
            });


        //$scope.updateMap();
        $scope.getImage = function(photos)
        {
            var photosArr = photos.split(',');
            return photosArr[0];
        }



    }
})();
