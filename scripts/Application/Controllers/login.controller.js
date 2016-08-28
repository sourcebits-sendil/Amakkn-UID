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
    function loginController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope) {
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
               $rootScope.myPromise = $timeout(function(){
                   $location.path('/signUp');
                   $scope.view.name = "otp";
                    $scope.userForm.isSocial = "No";
               }, 1000);
            }



        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
