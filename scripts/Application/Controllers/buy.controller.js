/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('buyController', buyController);

    /* @ngInject */
    function buyController ($log) {
        var vm = this;
        vm.class = 'buyController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
