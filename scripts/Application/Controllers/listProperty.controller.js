/**
 * @author: Devansh
 * @since(mm/dd/yy): 9/11/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('listPropertyController', listPropertyController);

    /* @ngInject */
    function listPropertyController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {
        var vm = this;
        vm.class = 'listPropertyController';
        $scope.propertiesTypeData = null;
        $scope.propertiesTypeCount = null;
        $scope.propCategory = "1";
        $scope.amenityListData = null;
        $scope.amenityListCount = null;
        $scope.currStatus = true;

        activate();

        //////////////

        function activate() {
            //$log.debug('Activating ' + vm.class);
        }
        // For select category and property type block 
        $scope.getBottmBorder = function(i, last){
            if(($scope.propertiesTypeCount % 2 == 0 && last) || ($scope.propertiesTypeCount % 2 == 0 && ($scope.propertiesTypeCount - 2) == i))
                return false;
            else if(($scope.propertiesTypeCount % 2 != 0 && last))
                return false;
            else
                return true;
        }
        $scope.selectCategory = function(categoryId){
            $scope.propCategory = categoryId;
            $scope.propertyTypeList();
        }
        $scope.propertyTypeList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getPropertyTypesForCategory/';
            var param = {"category":$scope.propCategory};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    $scope.propertiesTypeData = result.response;
                    $scope.propertiesTypeCount = result.response.length;
                }
            });
        }
        $scope.propertyTypeList();
        $scope.getImage = function(photos)
        {
            if (photos != "") 
            {
                var photosArr = photos.split(',');
                return photosArr[0];
            }
        }

        // for property location block 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.position = [position.coords.latitude, position.coords.longitude];
              $scope.positionStr = "["+position.coords.latitude+","+ position.coords.longitude+"]"
            });
        }

        // For addPropertyDetails block
        $scope.slider = {
            value: 100,
            options: {
                floor: 1960,
                ceil: 2016,
                step: 10,
                showTicksValues: true,
                translate: function(value) {
                    return '<b></b> ' + value;
                }
            }
        };
        $scope.minMaxRangeSlider = {
            minValue: 40,
            maxValue: 60,
            options: {
                floor: 0,
                ceil: 100,
                step: 1,
                minRange: 10,
                maxRange: 50
            }
        };

        $scope.amenityList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getAmenitiesForPropertyType/';
            var param = {"propertyType":"4"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    $scope.amenityListData = result.response;
                    $scope.amenityListCount = result.response.length;
                }
            });
        }
        $scope.amenityList();

        $scope.clickedBtn = function(index){
            $scope.selectedBtn = index;
            
        }
    }
})();
