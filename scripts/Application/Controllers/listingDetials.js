/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('listingDetials', listingDetials);

    /* @ngInject */
    function listingDetials ($log, $scope) {
        var vm = this;
        vm.class = 'listingDetials';


      $scope.slider = {
  value: 100,
  options: {
    floor: 1960,
    ceil: 2016,
    step: 10,
    showTicksValues: true,
    translate: function(value) {
      return '<b></b> ' + value;
    }
  }
};
        $scope.minMaxRangeSlider = {
    minValue: 40,
    maxValue: 60,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minRange: 10,
      maxRange: 50
    }
  };

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
