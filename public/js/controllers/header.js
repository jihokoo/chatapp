'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Articles',
        'link': 'articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create'
    }, {
        'title': 'Chatrooms',
        'link': 'chatroom'
    }, {
        'title': 'Create New Chatroom',
        'link': 'chatroom/create'
    }];

    $scope.isCollapsed = false;
}]);
