/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('rentController', rentController);

    /* @ngInject */
    function rentController ($log) {
        var vm = this;
        vm.class = 'rentController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
