/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('mortgageController', mortgageController);

    /* @ngInject */
    function mortgageController ($log) {
        var vm = this;
        vm.class = 'mortgageController';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
