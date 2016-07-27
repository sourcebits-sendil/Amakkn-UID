var amakknApp = angular.module("amakkn", ["ngRoute"]);


// Route used for Menu bar -------------
amakknApp.config(function($routeProvider){
    $routeProvider

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
    .when('/sell', {
        templateUrl : '../../Views/sell.html',
        controller  : 'sellController'
    })
    // route for the mortgage page
    .when('/mortgage', {
        templateUrl : '../../Views/mortgage.html',
        controller  : 'mortgageController'
    })
    // route for the realEstate page
    .when('/realEstate', {
        templateUrl : '../../Views/realEstate.html',
        controller  : 'realEstateController'
    })
    // route for the more page
    .when('/more', {
        templateUrl : '../../Views/more.html',
        controller  : 'contactController'
    })
    // route for the login page
    .when('/login', {
        templateUrl : '../../Views/login.html',
        controller  : 'contactController'
    })
    // route for the home page
    .when('/', {
        templateUrl : '../../Views/home.html',
        controller  : 'homeController'
    })
    .otherwise({ redirectTo: '/' });
})
