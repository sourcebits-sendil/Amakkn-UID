/**
 * @author Sendil
 * @since 25/7/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('signUpController', signUpController);

    /* @ngInject */
    function signUpController ($log, $scope, $http) {
        var vm = this;
        vm.class = 'signUpController';

        $scope.view={
              name: ''
            };

        $scope.userType = function(type){
           $scope.view.name=type;
            $scope.userForm.accountType = 1;
            //activate();
        }

        //activate();

        //////////////

        $scope.response = function activate() {
            $log.debug('Activating ' + $scope.userForm.accountType);
            $http({
                method : "POST",
                url : "http://52.42.99.192/Login/signupIndividualUser/"
            }).then(function mySucces(response) {
                $scope.myWelcome = response.data;
                 $log.debug($scope.myWelcome);
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        }
    }
})();
