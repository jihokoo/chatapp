'use strict';
angular.module('chatapp.controllers.users', []).controller('UserController', ['$scope', '$stateParams', '$location', 'Global', 'User', function ($scope, $stateParams, $location, Global, User) {
    $scope.global = Global;
    $scope.members;

    $scope.find = function() {
        User.query(function(users){
            $scope.users = users
            $scope.select2Options = {
                multiple: true,
                simple_tags: true,
                tags: ["hello","watsup"]
            }
        });
    };
}]);
