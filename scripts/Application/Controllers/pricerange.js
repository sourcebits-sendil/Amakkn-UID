/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('pricerange', pricerange);

    /* @ngInject */
    function pricerange
 ($log, $scope) {
        var vm = this;
        vm.class = 'pricerange';
function ctrl($scope) {
  $scope.value = "10;15";
  $scope.options = {
    from: 0,
    to: 40,
    step: 1,
    dimension: " $",
    scale: [0, '|', 10, '|', 20, '|' , 30, '|', 40]
  };
}
        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
