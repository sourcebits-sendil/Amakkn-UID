/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('morefilter', morefilter)
.config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
      }])
    /* @ngInject */
    function morefilter ($log, $timeout, $q, $scope) {
        var vm = this;
        vm.class = 'morefilter';
$scope.firstReset = function() {
    $scope.fruitForm = {};
  }

        $scope.self = this;
    $scope.self.readonly = false;
    // Lists of fruit names and Vegetable objects
    $scope.self.fruitNames = ['Apartment', 'Office', 'Warehouse', 'From $550,000 to $1M', '3+ Bedrooms', '2+ Bathrooms'];
    $scope.self.roFruitNames = angular.copy($scope.self.fruitNames);
    $scope.self.editableFruitNames = angular.copy($scope.self.fruitNames);
    $scope.self.tags = [];
    $scope.self.vegObjs = [
      {
        'name' : 'Broccoli',
        'type' : 'Brassica'
      },
      {
        'name' : 'Cabbage',
        'type' : 'Brassica'
      },
      {
        'name' : 'Carrot',
        'type' : 'Umbelliferous'
      }
    ];
        $scope.self.newVeg = function(chip) {
      return {
        name: chip,
        type: 'unknown'
      };
    };

         $scope.value = "1970;1980";
  $scope.options = {
    from: 1960,
    to: 2015,
    step: 1,
    dimension: " $",
    scale: [1960, '|', 1970, '|', 1980, '|' , 1990, '|', 2000, '|', 2015]
  };
         $scope.value2 = "300;1000";
  $scope.optionsone = {
    from: 200,
    to: 1200,
    step: 1,
    dimension: " m2",
    scale: [200+'m2' , '|', 400+'m2', '|', 600+'m2', '|' , 800+'m2', '|', 1000+'m2', '|', 1200+'m2']
  };

        $scope.value3 = "300;1000";
  $scope.optionstwo = {
    from: 200,
    to: 1200,
    step: 1,
    dimension: " m2",
    scale: [200+'m2', '|', 400+'m2', '|', 600+'m2', '|' , 800+'m2', '|', 1000+'m2', '|', 1200+'m2']
  };

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
