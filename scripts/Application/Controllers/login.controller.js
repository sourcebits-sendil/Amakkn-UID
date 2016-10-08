/**
 * @author
 * @since 8/1/2016
 */
(function () {
    'use strict';

    angular
        .module('amakkn')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController ($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, $mdToast, $auth) {
        //var vm = this;
        //vm.class = 'loginController';

        /* used for form values */
        $scope.userForm={
            name: '',
            email: ''
        };
        /* var for error Response */
        $scope.errorResponse={};
        /* var for success Response */
        $scope.successResponse={};
        //activate();
        $rootScope.loggedName = '';
        $scope.userForm.isSocial = "0";

        $rootScope.authenticate = function(provider) {
          $auth.authenticate(provider)
          .then(function(response) {
            // Signed in with Google.
              //alert('workings')

              //var param = '/oauthplayground/?code=4/yspt06Lki4P1q2x8mtep49iQd0mJO1oayrZ-YMghOFU


             //$log.debug(provider);
              if(provider == 'google'){
                    $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+response.access_token).success(function(data) {
                        $log.debug(data);
                        if(data.name != null){
                            $scope.userForm.name = data.name;

                        };
                        if(data.email != null){
                            $scope.userForm.email = data.email;
                        }
                        $scope.userForm.isSocial = "1";
                        $scope.userlogin();
                    });
              }else if(provider == 'facebook'){
                  $scope.userid = '';
                  var resData = '';
              $scope.userData = $http.get('https://graph.facebook.com/me?access_token='+response.access_token).success(function(data) {
                $log.debug(data);
                  if(data.name != null){
                        $scope.userForm.name = data.name;

                    };
                  resData = data;
                $scope.userid = data.id;
                  getEmail();

               })
                 var getEmail = function(){
                     $http({
                       method : "GET",
                       url : "https://graph.facebook.com/"+$scope.userid+"?fields=email,picture",
                       access_token:response.access_token
                   }).then(function mySucces(response) {
                       $log.debug(response.data);
                        if(response.data.email != null){
                            $scope.userForm.email = response.data.email;
                            $scope.userForm.isSocial = "1";
                            $scope.userlogin();
                        }

                   }, function myError(response) {
                       $log.debug(response.statusText);

                   });
                 }



              }
          })


          .catch(function(response) {
            // Something went wrong.

          })
        };

        $scope.userlogin = function(){

            $scope.urlRest = 'http://52.42.99.192/Login/loginUser/';
             //$log.debug($scope.userForm.password + ' '+$scope.userForm.password );
             //restCall();
            $rootScope.myPromise = httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                if(result.resCode == 0){
                    //alert('User Logged in')
                    $location.path('/');
                    $rootScope.loggedIn = true;
                    $rootScope.loggedName = result.response.user.name;
                    $scope.userForm.userId = result.response.user.userId;
                    $rootScope.userID = result.response.user.userId;
                    $log.debug($rootScope.userID)
                    //alert($rootScope.loggedName);
                    $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                }else{
                    //alert(result.resStr);
                }
             });
        }

            $scope.redirect = function(){

                //$mdToast.show($mdToast.simple().textContent('Hello'));
               $rootScope.myPromise = $timeout(function(){
                    $location.path('/signUp');
                   $rootScope.forgetPass = true;
                   //$rootScope.myPromise = $timeout(function(){$rootScope.view.name = "otp";}, 50)
                   //$rootScope.updateCountryCode()
                    //$scope.userForm.isSocial = "0";

               }, 1000);
            }


            $scope.$on('event:google-plus-signin-success', function (event,authResult) {
                // Send login to server or save into cookie

                $log.debug(authResult.data)
              });
              $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
                // Auth failure or signout detected
                  $log.debug(authResult.data)
              });
        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
