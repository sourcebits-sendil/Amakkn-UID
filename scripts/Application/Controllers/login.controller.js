/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, $mdToast) {
        //var vm = this;
        //vm.class = 'loginController';

        /* used for form values */
        $scope.userForm={};
        /* var for error Response */
        $scope.errorResponse={};
        /* var for success Response */
        $scope.successResponse={};
        //activate();
        $rootScope.loggedName = '';

        $scope.userlogin = function(){

            $scope.urlRest = 'http://52.42.99.192/Login/loginUser/';
             //$log.debug($scope.userForm.password + ' '+$scope.userForm.password );
             //restCall();
            $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                if(result.resCode == 0){
                    //alert('User Logged in')
                    $location.path('/');
                    $rootScope.loggedIn = true;
                    $rootScope.loggedName = result.response.user.name;
                    //alert($rootScope.loggedName);
                }else{
                    alert(result.resStr);
                }
             });
        }

            $scope.redirect = function(){

                //$mdToast.show($mdToast.simple().textContent('Hello'));
               $rootScope.myPromise = $timeout(function(){
                    $location.path('/signUp');
                   $rootScope.myPromise = $timeout(function(){$rootScope.view.name = "otp";}, 50)

                    $scope.userForm.isSocial = "No";

               }, 1000);
            }


            $scope.$on('event:google-plus-signin-success', function (event,authResult) {
                // Send login to server or save into cookie

                $log.debug(authResult.data)
              });
              $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
                // Auth failure or signout detected
                  $log.debug(authResult.data)
              });
        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
