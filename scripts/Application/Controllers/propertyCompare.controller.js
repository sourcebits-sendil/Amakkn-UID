
/**
 * @author: Devansh
 * @since 18/9/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('propertyCompareController', propertyCompareController);

    /* @ngInject */
    function propertyCompareController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, $mdToast, NgMap) {
        var vm = this;
        vm.class = 'propertyCompareController';
        $scope.propertiesData = null;
        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }

        $scope.propertyList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getComparePropertyDescriptions/';
            //$log.debug($scope.userForm.code +' '+ $scope.userForm.phone );
            var param = {"propertyIds":"1,2,3"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {
                $scope.propertiesData = result.response;
                
            });
        }
        $scope.propertyList();

        $scope.getImage = function(photos)
        {
            debugger;
            if (photos != "") 
            {
                var photosArr = photos.split(',');
                if(photosArr == null)
                {
                    return photos;
                }else{
                    return photosArr[0];
                }
            }
        }

        $scope.getDaysCount = function(createdAt)
        {
            var date1 = new Date(createdAt);
            var date2 = new Date();
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        }
    }
})();
