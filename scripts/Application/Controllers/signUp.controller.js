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
    function signUpController ($log, $scope, $http, $timeout) {
        var vm = this;
        vm.class = 'signUpController';

        $scope.view={
              name: '',
            accountType:''
            };
        $scope.userForm={

        };
        $scope.user = function(type){
           $scope.view.name=type;
            $scope.userForm.accountType = type=='indDetails'? '1':'2';
            //$log.debug($scope.view.accountType);
        }
        /*$scope.userForm.userType = '';
        $scope.userForm.phone = '';
        $scope.userForm.countryCode = '';
        $scope.userForm.name = '';*/

        $scope.addName = function(){
            //$log.debug($scope.userForm.userType );
            $scope.view.name = "otp";
            if($scope.userForm.accountType=='1'){
                $scope.urlRest = 'http://52.42.99.192/Login/signupIndividualUser/';

            }else{
                $scope.urlRest = 'http://52.42.99.192/Login/signupCorporateUser/';
            }

            //$scope.submitForm = $scope.userForm;
        }
        //activate();

        //////////////
        $scope.codes = null;
        $scope.countryCodes = null;
        $scope.loadCodes = function(){
            return $timeout(function() {
            /*$scope.countryCodes = [{"country_code":"AC","country_isd_code":"+247-####","country_name":"Ascension"}, {"country_code":"AD","country_isd_code":"+376-###-###","country_name":"Andorra"}];*/
                $http.get('../scripts/Library/data.json').success(function(data) {
            $scope.countryCodes = data;
            //$log.debug(data);
        });

    }, 650);

        }


        function activate() {
            $log.debug('Values ' + $scope.userForm.accountType + ' ' +
                       $scope.userForm.userType + ' ' +
                       $scope.userForm.countryCode + ' ' +
                      $scope.userForm.phone + ' ' +

                      $scope.userForm.name );

            //$http.post('http://52.42.99.192/Login/signupIndividualUser/', $scope.userForm) .success(function(data) { $log.debug(data) });

            $http({
              method  : 'POST',
                dataType: 'jsonp',
              url     : $scope.urlRest,
              data    : ($scope.submitForm),  // pass in data as strings
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
             })
              .success(function(data) {
                $log.debug(data);

                if (!data.success) {
                  // if not successful, bind errors to error variables

                } else {
                  // if successful, bind success message to message

                }
              });
        }
    }
})();
