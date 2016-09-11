/**
 * @author: Devansh
 * @since(mm/dd/yy): 9/11/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('myListingController', myListingController);

    /* @ngInject */
    function myListingController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {
        var vm = this;
        vm.class = 'myListingController';
        $scope.propertiesData = null;

        activate();

        //////////////

        function activate() {
            //$log.debug('Activating ' + vm.class);
        }
        $scope.myPropertyList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getMyProperties/';
            var param = {"userId":"1","page": "1","pageSize" :"9"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    debugger;
                    $scope.propertiesData = result.response.propertyArray;
                    $rootScope.propertyArr = result.response.propertyArray;
                    $scope.propertiesCount = result.response.totalCount;
                }

            });
        }
        $scope.myPropertyList();
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
