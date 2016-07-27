/**
 * @author Sendil
 * @since 7/27/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl ($scope, $log) {
        var vm = this;
        vm.class = 'MainCtrl';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
            $scope.message = 'Hello,  Welcome to Amakkn!!';
        }
    }
})();
