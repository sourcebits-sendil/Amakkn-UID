var amakknApp = angular.module("amakkn", ["ngRoute"]);


// Route used for Menu bar -------------
amakknApp.config(function($routeProvider){
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : '../../Views/home.html',
        controller  : 'homeController'
    })
   // route for the buy page
    .when('/buy', {
        templateUrl : '../../Views/buy.html',
        controller  : 'buyController'
    })
    // route for the rent page
    .when('/rent', {
        templateUrl : '../../Views/rent.html',
        controller  : 'contactController'
    })
    // route for the sell page
    .when('/rent', {
        templateUrl : '../../Views/sell.html',
        controller  : 'sellController'
    })
    // route for the mortgage page
    .when('/rent', {
        templateUrl : '../../Views/mortgage.html',
        controller  : 'mortgageController'
    })
    // route for the realEstate page
    .when('/rent', {
        templateUrl : '../../Views/realEstate.html',
        controller  : 'realEstateController'
    })
    // route for the more page
    .when('/rent', {
        templateUrl : '../../Views/more.html',
        controller  : 'contactController'
    })
    // route for the login page
    .when('/rent', {
        templateUrl : '../../Views/login.html',
        controller  : 'contactController'
    });
})
