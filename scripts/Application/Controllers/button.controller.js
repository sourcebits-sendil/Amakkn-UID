(function () {
  'use strict';
  angular
      .module('amakkn',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .config(['$mdIconProvider', function($mdIconProvider) {
       // $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
      }])
      .controller('buttoncontroller', buttoncontroller);

  function buttoncontroller ($timeout, $q) {
    var self = this;

    self.readonly = false;

    // Lists of fruit names and Vegetable objects
    self.fruitNames = ['Apple', 'Banana', 'Orange'];
    self.roFruitNames = angular.copy(self.fruitNames);
    self.editableFruitNames = angular.copy(self.fruitNames);

    self.tags = [];
    self.vegObjs = [
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

    self.newVeg = function(chip) {
      return {
        name: chip,
        type: 'unknown'
      };
    };
  }
})();


