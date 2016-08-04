/**
 * @author
 * @since 8/3/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('signUpController', SignUpController);

    /* @ngInject */
    function SignUpController ($log) {
        var vm = this;
        vm.class = 'SignUpController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
