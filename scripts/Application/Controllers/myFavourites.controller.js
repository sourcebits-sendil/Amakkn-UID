/**
 * @author: Devansh
 * @since(mm/dd/yy): 9/11/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('myFavouritesController', myFavouritesController);

    /* @ngInject */
    function myFavouritesController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {
        var vm = this;
        vm.class = 'myFavouritesController';
        $scope.propertiesData = null;

        activate();

        //////////////

        function activate() {
            //$log.debug('Activating ' + vm.class);
        }
        $scope.myFavouritiesList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getFavouritesForUser/';
            var param = {"userId":"1","page":"1"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    $scope.propertiesData = result.response.propertyArray;
                    $rootScope.propertyArr = result.response.propertyArray;
                    $scope.propertiesCount = result.response.totalCount;
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
    }
})();
