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

    function signUpController($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, $mdToast, NgMap) {

        var vm = this;
        var marker;
        $scope.address = '';

        /* initiating view objects used to switch */
        $rootScope.view={
              name: '',
            accountType:''
        };
        /* used to disable OTP button and enable resend link*/
        $scope.isDisabled = false;
        /* used for form values */
        $scope.userForm={};
        $scope.userForm.codes = {country_code:'',country_isd_code:''}
        /* var for error Response */
        $scope.errorResponse={};
        /* var for success Response */
        $scope.successResponse={};
        /* default seleted userType */
        $scope.userForm.userType = '1';
        /* default seleted userType */
        $scope.userForm.companyType = '1';
        /* loading country codes and ISD codes from JSON file from own Library*/
        $rootScope.loggedIn = false;
        $scope.locIP = '';

        $http.get('../scripts/Library/data.json').success(function(data) {
                $scope.countryCodes = data;
        });
        /* checking the browser's support for HTML geolocation support and fetching the country code based on IP address*/
        if (navigator.geolocation) {
           $.getJSON("http://freegeoip.net/json/", function(result){
                /* Selecting the matching country code in dropdown of the mobile number field*/
                //$scope.userForm.codes = result.country_code;
                //$scope.userForm.codes = result.country_code;
                $scope.locIP = result.country_code;
               //$log.debug(result)
               //$scope.userForm.codes.country_isd_code = result.country_isd_code;

            });
        }else{
                //alert("Geolocation services are not supported by your browser.");
        }
        /* Function to switch into details entry form based on user type - Individual or Real estate agent*/
        $scope.user = function(type){
            $scope.view.name = type;
            $scope.userForm.accountType = type == 'Individual'? '1':'2';

            if($scope.userForm.accountType == '2'){
                $scope.selectedUser = 'Company';
                var geocoder = new google.maps.Geocoder();
                $scope.placeChanged = function() {
                    //alert(' ');
                    vm.place = this.getPlace();

                    //alert(vm.place.geometry.location)
                    //console.log('location', vm.place.geometry.location);
                    vm.map.setCenter(vm.place.geometry.location);
                    /*$timeout(function(){
                     marker = new google.maps.Marker({position: vm.place.geometry.location, map: vm.map});
                        vm.map.panTo(vm.place.geometry.location);
                    }, 200);*/

                  }
                $timeout(function(){
                    NgMap.getMap().then(function(map) {
                    vm.map = map;
                      //alert(' ');
                        marker = new google.maps.Marker({position: map.getCenter(), map: vm.map});
                        vm.map.panTo(map.getCenter());

                        geocodePosition(marker.getPosition());
                  });
                },200)

               var geocodePosition = function(pos) {
                  geocoder.geocode({
                    latLng: pos
                  }, function(responses) {
                    if (responses && responses.length > 0) {
                          $timeout(function(){
                                $scope.address=(responses[0].formatted_address);
                                $scope.userForm.address = $scope.address;
                                //$scope.userForm.latitude = pos.lat();
                                //$scope.userForm.longitude = pos.lng();
                            },200);
                        //alert($scope.address);
                    } else {
                      $scope.address=('Cannot determine address at this location.');
                    }
                  });
                }
            }else{
                $scope.selectedUser = type;
            }

            var myEl = angular.element( document.querySelector( '#step1' ) );

            myEl.removeClass('active').addClass('complete');
            $timeout(function() {
                myEl = angular.element(document.querySelector('#step2')).removeClass('disabled').addClass('active');
            }, 500);

        };

        $scope.addName = function(){
            //$log.debug($scope.userForm.userType );
            $scope.view.name = "otp";
            $scope.userForm.isSocial = "0";
            $scope.countryCodes.country_code = $scope.locIP;
            if($scope.userForm.accountType=='1'){
                $scope.urlRest = 'http://52.42.99.192/Login/signupIndividualUser/';
            }else{
                $scope.urlRest = 'http://52.42.99.192/Login/signupCorporateUser/';
            }
            var myEl = angular.element( document.querySelector( '#step2' ) );
            myEl.removeClass('active').addClass('complete');
            $timeout(function() {
                myEl = angular.element( document.querySelector( '#step3' )).removeClass('disabled').addClass('active');
            }, 500);
        }
        $scope.selectedCode = function(code){
            $log.debug(code);
        }
        $scope.getOTP = function() {
            $scope.isDisabled = true;
            var IsdJson = $scope.countryCodes;
            var isd = $filter('filter')(IsdJson, {country_code:$scope.locIP})[0];
            //alert(isd.country_isd_code);
            $scope.userForm.countryCode =  isd.country_isd_code;
            $log.debug('Values ' + $scope.userForm.accountType + ' ' +
                       $scope.userForm.userType + ' ' +
                       $scope.userForm.countryCode  + ' ' +
                      $scope.userForm.email + ' ' +
                       $scope.userForm.phone + ' ' +
                       $scope.userForm.companyName + ' ' +
                       $scope.userForm.managerName + ' ' +
                       $scope.userForm.commercialRecordNumber + ' ' +

                       $scope.userForm.website + ' ' +
                       $scope.userForm.description + ' ' +
                           $scope.userForm.name );

        //$http.post('http://52.42.99.192/Login/signupIndividualUser/', $scope.userForm) .success(function(data) { $log.debug(data) });

           $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                if(result.resCode == 0){
                    $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                    // alert(result.resStr);
                    }else{
                        $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                        //alert(result.resStr);
                    }
                });
        }

        $scope.addPass = function(){
            $scope.urlRest = 'http://52.42.99.192/Login/verifyUser/';
            //$log.debug($scope.userForm.code +' '+ $scope.userForm.phone );
            var codeUpperCase = $filter('uppercase')($scope.userForm.code)
            $scope.userForm.code = codeUpperCase;
            //$log.debug($scope.userForm.code);
            $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                 if(result.resCode == 0){
                    $scope.view.name = 'pswrd';
                    var myEl = angular.element( document.querySelector( '#step3' ) );
            myEl.removeClass('active').addClass('complete');
            $timeout(function() {
                myEl = angular.element( document.querySelector( '#step4' )).removeClass('disabled').addClass('active');
            }, 500);
                }else{
                        $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                        //alert(result.resStr);
                    }
            });
        }


        $scope.resendOTP = function(){
            $scope.urlRest = 'http://52.42.99.192/Login/forgotPassword/';
            $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                 if(result.resCode == 0){

                     $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                       // alert(result.resStr);
                    }else{
                        $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                        //alert(result.resStr);
                    }
                });
        }
        $scope.confOTP = function(){
            $scope.urlRest = 'http://52.42.99.192/Login/verifyUser/';
            //$log.debug($scope.userForm.code +' '+ $scope.userForm.phone );
            var codeUpperCase = $filter('uppercase')($scope.userForm.code)
            $scope.userForm.code = codeUpperCase;


            $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                 if(result.resCode == 0){
                        $scope.view.name = 'pswrd';
                        var myEl = angular.element( document.querySelector( '#step3' ) );
                        myEl.removeClass('active').addClass('complete');

                        $timeout(function() {
                            myEl = angular.element( document.querySelector( '#step4' )).removeClass('disabled').addClass('active');
                        }, 500);
                    }else{
                        $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                        //alert(result.resStr);
                    }
                });
        }

         $scope.setPass = function(){
             $scope.urlRest = 'http://52.42.99.192/Login/setPasswordForUser/';
             $log.debug($scope.userForm.password);
             //restCall();
             $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                if(result.resCode == 0){
                    var myEl = angular.element( document.querySelector( '#step4' ) );
                    myEl.removeClass('active').addClass('complete');
                    $rootScope.loggedIn = true;
                    $rootScope.loggedName = result.response.user.name;
                    $location.path('/');

                }else{
                    $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                    //alert(result.resStr);
                }
             });
         }
             $scope.isCurrentPage = $location.path() === '/signUp';

         // Map implementations --------


    }
})();
