 angular.module('TabsApp', [])
.controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'Buy',
            url: 'one.tpl.html'
        }, {
            title: 'Rent',
            url: 'two.tpl.html'
        }, {
            title: 'Sell',
            url: 'three.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);
