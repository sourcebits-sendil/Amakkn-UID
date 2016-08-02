/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('listPropertyiesController', listPropertyiesController);

    /* @ngInject */
    function listPropertyiesController ($log) {
        var vm = this;
        vm.class = 'listPropertyiesController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
