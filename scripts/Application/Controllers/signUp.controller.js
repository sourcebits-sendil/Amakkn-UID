/**
 * @author Sendil
 * @since 25/7/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('signUpController', signUpController);

    /* @ngInject */
    function signUpController($log, $scope, $http, $timeout, $filter) {

        /* initiating view objects used to switch */
        $scope.view={
              name: '',
            accountType:''
        };
        /* used to disable OTP button and enable resend link*/
        $scope.isDisabled = false;
        /* used for form values */
        $scope.userForm={};
        /* var for error Response */
        $scope.errorResponse={};
        /* var for success Response */
        $scope.successResponse={};
        /* default seleted userType */
        $scope.userForm.userType = '1';
        /* default seleted userType */
        $scope.userForm.companyType = '1';
        /* loading country codes and ISD codes from JSON file from own Library*/ $http.get('../scripts/Library/data.json').success(function(data) {
                $scope.countryCodes = data;
        });
        /* checking the browser's support for HTML geolocation support and fetching the country code based on IP address*/
        if (navigator.geolocation) {

            $.getJSON("http://freegeoip.net/json/", function(result){
                /* Selecting the matching country code in dropdown of the mobile number field*/
                $scope.userForm.codes = result.country_code;
            });
        }else{
                //alert("Geolocation services are not supported by your browser.");
        }
        /* Function to switch into details entry form based on user type - Individual or Real estate agent*/
        $scope.user = function(type){
            $scope.view.name = type;
            $scope.selectedUser = type;
            $scope.userForm.accountType = type == 'Individual'? '1':'2';
            var myEl = angular.element( document.querySelector( '#step1' ) );
myEl.removeClass('active');myEl.addClass('complete');
            $timeout(function() {
                myEl = angular.element(document.querySelector('#step2')).removeClass('disabled').addClass('active');
            }, 500);
        };

        $scope.addName = function(){
            //$log.debug($scope.userForm.userType );
            $scope.view.name = "otp";



            if($scope.userForm.accountType=='1'){
                $scope.urlRest = 'http://52.42.99.192/Login/signupIndividualUser/';
            }else{
                $scope.urlRest = 'http://52.42.99.192/Login/signupCorporateUser/';

            }

            //$scope.submitForm = $scope.userForm;
            var myEl = angular.element( document.querySelector( '#step2' ) );
            myEl.removeClass('active');myEl.addClass('complete');
            $timeout(function() {
                myEl = angular.element( document.querySelector( '#step3' )).removeClass('disabled').addClass('active');
            }, 500);

        }
        //activate();


        $scope.codes = null;
        $scope.countryCodes = null;
        $scope.loadCodes = function(){
            return $timeout(function() {
            $http.get('../scripts/Library/data.json').success(function(data) {
                $scope.countryCodes = data;

            });

            }, 650);

        }

        $scope.getOTP = function() {
            $scope.isDisabled = true;
            $scope.userForm.countryCode = $scope.userForm.codes.country_isd_code;
            $log.debug('Values ' + $scope.userForm.accountType + ' ' +
                       $scope.userForm.userType + ' ' +
                       $scope.userForm.countryCode  + ' ' +
                      $scope.userForm.phone + ' ' +

                      $scope.userForm.name );

        //$http.post('http://52.42.99.192/Login/signupIndividualUser/', $scope.userForm) .success(function(data) { $log.debug(data) });
            restCall();

        }

        function restCall(){
            $http({
                method  : 'POST',
                dataType: 'jsonp',
                url     : $scope.urlRest,
                data    : $scope.userForm,  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
             })
              .then(function successCallback(data) {


                if (!data.success) {
                  // if not successful, bind errors to error variables
                    $log.debug(data.resStr);
                    $scope.successResponse = data;
                } else {
                  // if successful, bind success message to message
                    $log.debug(data.resStr);
                    $scope.successResponse = data;
                }
              }, function errorCallback(response) {


            });
        }


    }
})();
