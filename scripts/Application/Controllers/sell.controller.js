/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('sellController', sellController);

    /* @ngInject */
    function sellController ($log) {
        var vm = this;
        vm.class = 'sellController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
