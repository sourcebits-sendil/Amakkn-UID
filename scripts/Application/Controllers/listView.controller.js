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
    function listViewController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, $mdToast, NgMap) {
        var vm = this;
        vm.class = 'listViewController';
        $scope.propertiesData = null;
        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }

        $scope.propertyList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/searchPropertiesInLocation/';
            //$log.debug($scope.userForm.code +' '+ $scope.userForm.phone );
            var param = {"latitude":"12.986926","longitude":"77.687130","page" : "1"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {
                 $scope.propertiesData = result.response.propertyArray;
                 $scope.propertiesCount = result.response.totalCount;
            });
        }
        $scope.propertyList();
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
