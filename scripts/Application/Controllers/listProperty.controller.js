/**
 * @author: Devansh
 * @since(mm/dd/yy): 9/11/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('listPropertyController', listPropertyController);

    /* @ngInject */
    function listPropertyController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {
        var vm = this;
        vm.class = 'listPropertyController';
        $scope.propertiesTypeData = null;
        $scope.propertiesTypeCount = null;
        $scope.propCategory = "1";
        $scope.amenityListData = null;
        $scope.amenityListCount = null;
        $scope.currStatus = true;

        activate();

        //////////////

        function activate() {
            //$log.debug('Activating ' + vm.class);
        }
        // For select category and property type block 
        $scope.getBottmBorder = function(i, last){
            if(($scope.propertiesTypeCount % 2 == 0 && last) || ($scope.propertiesTypeCount % 2 == 0 && ($scope.propertiesTypeCount - 2) == i))
                return false;
            else if(($scope.propertiesTypeCount % 2 != 0 && last))
                return false;
            else
                return true;
        }
        $scope.selectCategory = function(categoryId){
            $scope.propCategory = categoryId;
            $scope.propertyTypeList();
        }
        $scope.propertyTypeList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getPropertyTypesForCategory/';
            var param = {"category":$scope.propCategory};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    $scope.propertiesTypeData = result.response;
                    $scope.propertiesTypeCount = result.response.length;
                }
            });
        }
        $scope.propertyTypeList();
        $scope.getImage = function(photos)
        {
            if (photos != "") 
            {
                var photosArr = photos.split(',');
                return photosArr[0];
            }
        }

        // for property location block 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              $scope.position = [position.coords.latitude, position.coords.longitude];
              $scope.positionStr = "["+position.coords.latitude+","+ position.coords.longitude+"]"
            });
        }

        // For addPropertyDetails block
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
        
        
          $scope.value4 = "300;1000";
  $scope.options = {
    from: 200,
    to: 1200,
    step: 1,
    dimension: " m2",
    scale: [200+'m2', '|', 400+'m2', '|', 600+'m2', '|' , 800+'m2', '|', 1000+'m2', '|', 1200+'m2']
  };

      
         $scope.value5 = "300;1000";
  $scope.options = {
    from: 200,
    to: 1200,
    step: 1,
    dimension: " m2",
    scale: [200+'m2', '|', 400+'m2', '|', 600+'m2', '|' , 800+'m2', '|', 1000+'m2', '|', 1200+'m2']
  };

        
        //pagignation
       
        
        $scope.showData = function( ){

 $scope.curPage = 0;
 $scope.pageSize = 3;
     $scope.datalists = [
         { "name": "John","age":"16","designation":"Software Engineer1"},
    {"name": "John2","age":"21","designation":"Software Engineer2"},
    {"name": "John3","age":"19","designation":"Software Engineer3"},
    {"name": "John4","age":"17","designation":"Software Engineer4"},
    {"name": "John5","age":"21","designation":"Software Engineer5"},
    {"name": "John6","age":"31","designation":"Software Engineer6"},
    {"name": "John7","age":"41","designation":"Software Engineer7"},
    {"name": "John8","age":"16","designation":"Software Engineer8"},
    {"name": "John18","age":"16","designation":"Software Engineer9"},
    {"name": "John28","age":"16","designation":"Software Engineer10"},
    {"name": "John38","age":"16","designation":"Software Engineer11"},
    {"name": "John48","age":"16","designation":"Software Engineer12"},
    {"name": "John58","age":"16","designation":"Software Engineer13"},
    {"name": "John68","age":"16","designation":"Software Engineer14"},
    {"name": "John68","age":"16","designation":"Software Engineer15"}
]
     $scope.numberOfPages = function() {
				return Math.ceil($scope.datalists.length / $scope.pageSize);
			};
         
};
        
        
        $scope.showDatas = function( ){

 $scope.curPages = 0;
 $scope.pageSizes = 1;
     $scope.datalistss = [
         { "name": "John","age":"16","designation":"Software Engineer1"},
    {"name": "John2","age":"21","designation":"Software Engineer2"},
    {"name": "John3","age":"19","designation":"Software Engineer3"},
    {"name": "John4","age":"17","designation":"Software Engineer4"},
    {"name": "John5","age":"21","designation":"Software Engineer5"},
    {"name": "John6","age":"31","designation":"Software Engineer6"},
    {"name": "John7","age":"41","designation":"Software Engineer7"},
    {"name": "John8","age":"16","designation":"Software Engineer8"},
    {"name": "John18","age":"16","designation":"Software Engineer9"},
    {"name": "John28","age":"16","designation":"Software Engineer10"},
    {"name": "John38","age":"16","designation":"Software Engineer11"},
    {"name": "John48","age":"16","designation":"Software Engineer12"},
    {"name": "John58","age":"16","designation":"Software Engineer13"},
    {"name": "John68","age":"16","designation":"Software Engineer14"},
    {"name": "John68","age":"16","designation":"Software Engineer15"}
]
     $scope.numberOfPagess = function() {
				return Math.ceil($scope.datalistss.length / $scope.pageSizes);
			};
         
};
        
        
         $scope.showData3 = function( ){

 $scope.curPage3 = 0;
 $scope.pageSize3 = 3;
     $scope.datalists3 = [
         { "name": "John","age":"16","designation":"Software Engineer1"},
    {"name": "John2","age":"21","designation":"Software Engineer2"},
    {"name": "John3","age":"19","designation":"Software Engineer3"},
    {"name": "John4","age":"17","designation":"Software Engineer4"},
    {"name": "John5","age":"21","designation":"Software Engineer5"},
    {"name": "John6","age":"31","designation":"Software Engineer6"},
    {"name": "John7","age":"41","designation":"Software Engineer7"},
    {"name": "John8","age":"16","designation":"Software Engineer8"},
    {"name": "John18","age":"16","designation":"Software Engineer9"},
    {"name": "John28","age":"16","designation":"Software Engineer10"},
    {"name": "John38","age":"16","designation":"Software Engineer11"},
    {"name": "John48","age":"16","designation":"Software Engineer12"},
    {"name": "John58","age":"16","designation":"Software Engineer13"},
    {"name": "John68","age":"16","designation":"Software Engineer14"},
    {"name": "John68","age":"16","designation":"Software Engineer15"}
]
     $scope.numberOfPages3 = function() {
				return Math.ceil($scope.datalists3.length / $scope.pageSize3);
			};
         
};
        

        $scope.amenityList = function(){
            $scope.urlRest = 'http://52.42.99.192/Property/getAmenitiesForPropertyType/';
            var param = {"propertyType":"4"};
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {    
                if(result.resCode == 0){
                    $scope.amenityListData = result.response;
                    $scope.amenityListCount = result.response.length;
                }
            });
        }
        $scope.amenityList();

        $scope.clickedBtn = function(index){
            $scope.selectedBtn = index;
            
        }
    }
})();
