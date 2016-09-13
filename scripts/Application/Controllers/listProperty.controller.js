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

        activate();

        //////////////

        function activate() {
            //$log.debug('Activating ' + vm.class);
        }
        $scope.myfunc = function(i, last){
            if(($scope.propertiesTypeCount % 2 == 0 && last) || ($scope.propertiesTypeCount % 2 == 0 && ($scope.propertiesTypeCount - 2) == i))
                return false;
            else if(($scope.propertiesTypeCount % 2 != 0 && last))
                return false;
            else
                return true;
        }
        $scope.selectCategory = function(categoryId){
            $scope.propCategory = categoryId;
            $scope.myFavouritiesList();
        }
        $scope.myFavouritiesList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getPropertyTypesForCategory/';
            var param = {"category":$scope.propCategory};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    $scope.propertiesTypeData = result.response;
                    $scope.propertiesTypeCount = result.response.length;
                }
            });
        }
        $scope.myFavouritiesList();
        $scope.getImage = function(photos)
        {
            if (photos != "") 
            {
                var photosArr = photos.split(',');
                return photosArr[0];
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.position = [position.coords.latitude, position.coords.longitude];
              $scope.positionStr = "["+position.coords.latitude+","+ position.coords.longitude+"]"
            });
        }
    }
})();
