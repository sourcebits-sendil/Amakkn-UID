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
    function loginController ($log) {
        var vm = this;
        vm.class = 'loginController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
