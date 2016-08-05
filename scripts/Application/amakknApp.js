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
        controller  : 'rentController'
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
    // route for the login page
    .when('/login', {
        templateUrl : '../../Views/login.html',
        controller  : 'loginController'
    })
    .when('/signUp', {
        templateUrl : '../../Views/signUp.html',
        controller  : 'signUpController'
    })
    // route for the login page
    .when('/listProperties', {
        templateUrl : '../../Views/listProperties.html',
        controller  : 'listPropertyiesController'
    })
    // route for the home page
    .when('/', {
        templateUrl : '../../Views/home.html'
    })
    .otherwise({ redirectTo: '/' });
})
