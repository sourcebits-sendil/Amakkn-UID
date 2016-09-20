/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('addPropertyDetails', addPropertyDetails);

    /* @ngInject */
    function addPropertyDetails ($log, $scope) {
        var vm = this;
        vm.class = 'addPropertyDetails';

        
        $scope.value4 = "1970;1980";
  $scope.options = {
    from: 1960,
    to: 2015,
    step: 1,
    dimension: " $",
    scale: [1960, '|', 1970, '|', 1980, '|' , 1990, '|', 2000, '|', 2015]
  };
        
        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
