
/**
 * @author: Devansh
 * @since 5/9/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('propertyDetailsController', propertyDetailsController);

    /* @ngInject */
    function propertyDetailsController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, $mdToast, NgMap) {
        var vm = this;
        $scope.imageArray = null;
        $scope.diffDays = null;
        vm.class = 'propertyDetailsController';
        $scope.propertiesData = null;
        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }

        $scope.propertyList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getPropertyDescription/';
            //$log.debug($scope.userForm.code +' '+ $scope.userForm.phone );
            var param = {"propertyId":"1"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {
                $scope.propertiesData = result.response;
                var images = result.response.photos;
                $scope.imageArray = images.split(',');
                var date1 = new Date(result.response.createdAt);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				$scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            });
        }
        $scope.propertyList();
        /*$scope.getImage = function(photos)
        {
            var photosArr = photos.split(',');
            return photosArr[0];
        }*/
    }
})();
