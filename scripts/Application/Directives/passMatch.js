/**
 * @author
 * @since 8/16/2016
 */

(function () {
    'use strict';

    angular
        .module('amakkn.directive',[])
        .directive('pwCheck', pwCheck);

    /* @ngInject */
    function pwCheck ($log) {
        return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }

    }
})();
