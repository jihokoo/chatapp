'use strict';

angular.module('chatapp.controllers.header', [])
    .controller('HeaderController', [
        '$scope',
        'Global',
        function ($scope, Global) {
            $scope.global = Global;

            $scope.menu = [{
                'title': 'Chatrooms',
                'link': 'chatroom'
            }, {
                'title': 'New Chatroom',
                'link': 'chatroom/create'
            }];

            $scope.isCollapsed = false;
        }
    ]);
