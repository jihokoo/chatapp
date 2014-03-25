'use strict';

angular.module('chatapp.controllers.index', []).controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);
