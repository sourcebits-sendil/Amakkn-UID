/**
 * @author
 * @since 8/16/2016
 */

(function () {
    'use strict';

    angular
        .module('http.service',[])
        .factory('httpService', httpPostService);
                 /* @ngInject */
    function httpPostService($http) {

    var getData = function(myUrl, formData) {

        // Angular $http() and then() both return promises themselves
        return $http({method:"POST",
                        dataType: 'jsonp',
                        url:    myUrl,
                        data    : formData,  // pass in data as strings
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                      }).then(function(result){

            //element.style.visibility='hidden';
            // What we return here is the data that will be accessible
            // to us after the promise resolves
            return result.data;
        });
    };


    return { getData: getData };


};

})();
