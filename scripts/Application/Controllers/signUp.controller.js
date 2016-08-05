/**
 * @author
 * @since 8/3/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('signUpController', signUpController);

    /* @ngInject */
    function signUpController ($log, $scope) {
        var vm = this;
        vm.class = 'signUpController';
        $scope.view={
              name: ''
            };
        $log.debug('userType ' + $scope.userType);
        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
