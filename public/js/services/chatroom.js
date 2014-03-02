'use strict';

//Articles service used for articles REST endpoint
angular.module('chatapp.services.chatrooms', []).factory('Chatroom', ['$resource', function($resource) {
    return $resource('chatroom/:chatroomId', {
        chatroomId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
