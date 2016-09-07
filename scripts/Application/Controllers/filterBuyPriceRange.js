/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('filterBuyPriceRange', filterBuyPriceRange);

    /* @ngInject */
    function filterBuyPriceRange
 ($log, $scope) {
        var vm = this;
        vm.class = 'filterBuyPriceRange';
$scope.slider = {
  minValue: 100,
  maxValue: 400,
  options: {
    floor: 0,
    ceil: 500,
    translate: function(value, sliderId, label) {
      switch (label) {
        case 'model':
          return '<b>Min price:</b> $' + value;
        case 'high':
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value
      }
    }
  }
};

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
