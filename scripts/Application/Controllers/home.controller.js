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
    function homeController ($scope, $log,$timeout,$mdToast,$rootScope,$location) {
        var vm = this;
        vm.class = 'homeController';

        $scope.selection = "banner";
       // $log.debug($scope.selection);

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
        $scope.switchMap = function(){
            $rootScope.myPromise = $timeout(function(){
                $scope.selection = "map";
            }, 1000)
        }

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class );
            //$scope.message = 'Hello,  Welcome to Amakkn!!';
        }
    }
})();
