var amakknApp = angular.module("amakkn", ["ngRoute", 'amakkn.directive', 'http.service', 'ngMaterial', 'cgBusy', 'ngCookies', 'directive.g+signin', 'ngMap', 'rzModule', 'ngSanitize', 'angularAwesomeSlider', 'satellizer']);

angular.module('Authentication', []);
// Route used for Menu bar -------------
amakknApp.config(function($routeProvider){

    $routeProvider

   // route for the buy page
    .when('/buy', {
        templateUrl : '../Views/buy.html',
        controller  : 'buyController'
    })
    // route for the rent page
    .when('/rent', {
        templateUrl : '../Views/rent.html',
        controller  : 'rentController'
    })
    // route for the sell page
    .when('/sell', {
        templateUrl : '../Views/sell.html',
        controller  : 'sellController'
    })
    // route for the mortgage page
    .when('/mortgage', {
        templateUrl : '../Views/mortgage.html',
        controller  : 'mortgageController'
    })
    // route for the login page
    .when('/login', {
        templateUrl : '../Views/login.html',
        controller  : 'loginController'
    })
    .when('/signUp', {
        templateUrl : '../Views/signUp.html',
        controller  : 'signUpController'
    })
    // route for the login page
    .when('/profile', {
        templateUrl : '../Views/profile.html'

    })
      .when('/listView', {
        templateUrl : '../Views/listView.html',
        controller  : 'listViewController'

    })
    .when('/propertyDetails', {
        templateUrl : '../Views/propertyDetails.html',
        controller  : 'propertyDetailsController'
    })

    .when('/myListing', {
        templateUrl : '../Views/myListing.html',
        controller  : 'myListingController'

    })
    .when('/myFavourites', {
        templateUrl : '../Views/myFavourites.html',
        controller  : 'myFavouritesController'

    })
     .when('/myFavouritesList', {
        templateUrl : '../Views/myFavouritesList.html',
        controller  : 'myFavouritesController'
    })
     .when('/qrcode', {
        templateUrl : '../Views/qrcode.html'
    })
    .when('/agentproperties', {
        templateUrl : '../Views/agentproperties.html'

    })
    .when('/agentprofile', {
        templateUrl : '../Views/agentprofile.html'

    })
    .when('/addagent', {
        templateUrl : '../Views/addagent.html'
    })

    .when('/listYourProp', {
        templateUrl : '../Views/listYourProp.html',
        controller  : 'listPropertyController'
    })
    .when('/propertyLocation', {
        templateUrl : '../Views/propertyLocation.html',
        controller  : 'listPropertyController'
    })
    .when('/addPropertyDetails', {
        templateUrl : '../Views/addPropertyDetails.html',
         controller  : 'listPropertyController'
    })
    .when('/roomsbathroom', {
        templateUrl : '../Views/roomsbathroom.html'
    })
    .when('/completelisting', {
        templateUrl : '../Views/completelisting.html'
    })
    .when('/completelistingphoto', {
        templateUrl : '../Views/completelistingphoto.html'
    })
    .when('/addresssave', {
        templateUrl : '../Views/addresssave.html'
    })
     .when('/propertydescription', {
        templateUrl : '../Views/propertydescription.html'
    })
     .when('/listtype', {
        templateUrl : '../Views/listtype.html'
    })
    .when('/pricerange', {
        templateUrl : '../Views/pricerange.html'
    })

    .when('/bedbaths', {
        templateUrl : '../Views/bedbaths.html'
    })
    .when('/filterproperty', {
        templateUrl : '../Views/filterproperty.html'
    })
    .when('/filterPropertyType', {
        templateUrl : '../Views/filterPropertyType.html'
    })
    .when('/filterBuyPriceRange', {
        templateUrl : '../Views/filterBuyPriceRange.html',
        controller  : 'filterBuyPriceRange',
    })
    .when('/listingDetialsCustom', {
        templateUrl : '../Views/listingDetialsCustom.html',

    })
    .when('/listMap', {
        templateUrl : '../Views/listMap.html',
        controller  : 'listViewController'

    })
    .when('/morefilter', {
        templateUrl : '../Views/morefilter.html',
        controller  : 'morefilter'
    })
    
    .when('/propertyCompare', {
        templateUrl : '../Views/propertyCompare.html',
        controller  : 'propertyCompareController'
    })
    
    
   

    // route for the home page
    .when('/', {
        templateUrl : '../Views/home.html'
        /*resolve: {
              delay: function($timeout) {
                return $timeout(function(){}, 3000);
              }
            }*/
    })
    .otherwise({ redirectTo: '/' });
}).run(function($rootScope, $http) {
        //run();
    'use strict';

    $http.defaults.headers.common.Accept = 'application/json';
    $http.defaults.headers.common['Content-Type'] = 'application/json';
      $rootScope.$on('$stateChangeStart', function() {
        $rootScope.stateLoading = true;
      })

      $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.stateLoading = false;
      })
    })
.factory('MyService', ['$http', function($http){

  var Service = {};

  Service.requestingSomeURL = function(){
    for (var i = http.pendingRequests.length - 1; i >= 0; i--) {
      if($http.pendingRequests[i].url === ('/someURL')) return true;
    }
    return false;
  }

  return Service;
}])
  .config(function($authProvider) {

    $authProvider.facebook({
      clientId: '192874244471411'
    });
    $authProvider.google({
      clientId: '491700206414-7d9695rso2ecnve37pe259jk2g7idf6k.apps.googleusercontent.com',
        responseType: 'token'
    });

})
/*.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingListener');
}])
.factory('LoadingListener', [ '$q', '$rootScope', function($q, $rootScope) {
    var reqsActive = 0;

    function onResponse() {
        reqsActive--;
        if (reqsActive === 0) {
            $rootScope.$broadcast('loading:completed');
        }
    }

    return {
        'request': function(config) {
            if (reqsActive === 0) {
                $rootScope.$broadcast('loading:started');
            }
            reqsActive++;
            return config;
        },
        'response': function(response) {
            if (!response || !response.config) {
                return response;
            }
            onResponse();
            return response;
        },
        'responseError': function(rejection) {
            if (!rejection || !rejection.config) {
                return $q.reject(rejection);
            }
            onResponse();
            return $q.reject(rejection);
        },
        isLoadingActive : function() {
            return reqsActive === 0;
        }
    };
}])

.directive('loadingListener', [ '$rootScope', 'LoadingListener', function($rootScope, LoadingListener) {

    var tpl = ''//'<div class="preLoaderContainer" id="page-loading" ><div class="cssload-thecube"><div class="cssload-cube cssload-c1"></div><div class="cssload-cube cssload-c2"></div><div class="cssload-cube cssload-c4"></div><div class="cssload-cube cssload-c3"></div></div></div>';

    return {
        restrict: 'CA',
        link: function linkFn(scope, elem, attr) {
            var indicator = angular.element(tpl);
            elem.prepend(indicator);

            elem.css('position', 'relative');
            if (!LoadingListener.isLoadingActive()) {
                indicator.css('display', 'none');
            }

            $rootScope.$on('loading:started', function () {
                indicator.css('display', 'block');
                alert(' completed ')
            });
            $rootScope.$on('loading:completed', function () {
                indicator.css('display', 'none');

            });
        }
    };
}]); */
amakknApp.controller('index',['MyService','$scope', '$location', '$rootScope', function($scope,$http,MyService, $location,$rootScope, auth){

    $scope.auth = auth;
    /*$scope.pendingRequests = function(){
        return MyService.requestingSomeURL();
      }*/


}]);
//amakknApp.run(run);
/*run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
        alert('working')
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }*/

