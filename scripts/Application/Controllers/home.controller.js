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
    function homeController ($scope, $log) {
        var vm = this;
        vm.class = 'homeController';

        $scope.selection = "banner";
        $log.debug($scope.selection);

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class );
            //$scope.message = 'Hello,  Welcome to Amakkn!!';
        }
    }
})();
