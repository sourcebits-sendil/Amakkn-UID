/**
 * @author Sendil
 * @since 7/27/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('homeCtrl', homeController);

    /* @ngInject */
    function homeController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast) {




        var vm = this;
        vm.class = 'homeController';


        //var marker;
        $rootScope.positions =[];
        $rootScope.search = {
            latitude:'',
            longitude:'',
            page:'1'
        };
        $rootScope.latLong = null;
        $scope.selection = "banner";
       // $log.debug($scope.selection);
        $scope.isFav = false;
        $scope.urlRest = '';
        //property list
        $scope.user = null;
        $scope.users = null;
        $scope.currentNavItem = "buy";
        $rootScope.propertyArr = [];

  $scope.loadUsers = function() {
    // Use timeout to simulate a 650ms request.
    return $timeout(function() {
      $scope.users =  $scope.users  || [
        { id: 1, name: 'Residential' },
        { id: 2, name: 'Commercial' }
      ];
    }, 650);
  };


        $scope.isFavTog = function(Prop){

            Prop.isFav = {false:true, true:false}[Prop.isFav];
        }

        $scope.urlGet = 'http://52.42.99.192/Testimonials/getTestimonials/';
                $http({
                    method : "GET",
                    url : $scope.urlGet})
                .then(function mySucces(result) {
                    if(result.data.resCode == 0){

                        var arr = [];
                            arr = result.data.response.testimonialArray;
                        //alert('got data' + arr)
                    $scope.userFeed = arr;
                }else{
                    alert(result.data.resCode);
                }
             });



        $scope.logOut = function(){
            //alert('working')
            $rootScope.myPromise = $timeout(function(){
            $location.path('/');
            $rootScope.loggedIn = false;
            }, 1000)

        }

        $scope.switchBanner = function(){
           $timeout(function(){
                $scope.selection = "banner";
                }, 1000)
        }
        $scope.placeChanged = function() {
            vm.place = this.getPlace();
            $rootScope.latLong = vm.place.geometry.location;
            $rootScope.search.latitude = $rootScope.latLong.lat();
            $rootScope.search.longitude = $rootScope.latLong.lng();
            //alert($rootScope.search.latitude);
        }
        $scope.switchMap = function(){
            $scope.selection = "map";
            NgMap.getMap().then(function(map) {
                vm.map = map;

                $timeout(function(){
                    $rootScope.latLong = (map.getCenter());
                    $rootScope.search.latitude = $rootScope.latLong.lat();
                    $rootScope.search.longitude = $rootScope.latLong.lng();
                    getProperties();
                }, 200);
            });
        }
        
        
        
        $scope.value7 = "200;300";
  $scope.options = {
      
    from: 1,
    to: 500,
    step: 1,
    dimension: "$",
    
  };
        
        //filter home page
        
        $scope.showDatafilter = function( ){

 $scope.curPagefilter = 0;
 $scope.pageSizefilter = 1;
     $scope.datalistsfilter = [
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
     $scope.numberOfPagesfilter = function() {
				return Math.ceil($scope.datalistsfilter.length / $scope.pageSizefilter);
			};
         
};
        
        
         $scope.showDatafilter1 = function( ){

 $scope.curPagefilter1 = 0;
 $scope.pageSizefilter1 = 1;
     $scope.datalistsfilter1 = [
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
     $scope.numberOfPagesfilter1 = function() {
				return Math.ceil($scope.datalistsfilter1.length / $scope.pageSizefilter1);
			};
         
};

        var getProperties = function(){

                $scope.urlRest = 'http://52.42.99.192/Property/searchPropertiesInLocation/';
                //$log.debug($rootScope.search.latitude +' '+ $rootScope.search.longitude);

                httpService.getData($scope.urlRest, $rootScope.search).then(function(result) {
                if(result.resCode == 0){
                    $rootScope.propertyArr = result.response.propertyArray;
                    $rootScope.positions = [];
                    $rootScope.propertyArr.forEach(function(val, i){
                        //$log.debug(val.latitude +' ' +val.longitude);
                        $log.debug(val.price)
                        $rootScope.positions.push({pos:[val.latitude, val.longitude], price: ('$' +val.price.price/1000 + 'k')});

                    });
                    //$mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));

                    }else{
                        $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                        //alert(result.resStr);
                    }
                });

        }

        //$rootScope.hideFooter = $location.path() === '/signUp';
        //alert($rootScope.hideFooter);

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class );
            //$scope.message = 'Hello,  Welcome to Amakkn!!';
        }
    }
})();
