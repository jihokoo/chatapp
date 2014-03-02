'use strict';

//Articles service used for articles REST endpoint
angular.module('chatapp.services.messages', []).factory('Message', ['$resource', function($resource) {
    return $resource('message/:messageId', {
        messageId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
