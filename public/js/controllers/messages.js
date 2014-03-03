'use strict';
angular.module('chatapp.controllers.messages', []).controller('MessagesController', ['$scope', '$stateParams', '$location', 'Global', 'Message', function ($scope, $stateParams, $location, Global, Message) {
    $scope.global = Global;

    var sock = new SockJS('/echo');
    $scope.temporary_messages = [];


    $scope.create_message = function(chatroomId) {
        var message = new Message({
            content: this.content,
            chatroomId: chatroomId,
            username: window.user.name
        });
        console.log(chatroomId)
        message.$save(function(response){
            console.log(response)
            sock.send([response.created, response.creator.name, response.content])
        });

        this.content = '';
    };

//s


    sock.onopen = function() {
        console.log('open');
    };

    sock.onmessage = function(e) {
        $scope.temporary_messages.push(e.data.split(","))
        $scope.$apply();
    };

    sock.onclose = function() {
        console.log('sockjs close');
    };

    $scope.finds = function() {
        var message = new Message({
            chatroomId: $stateParams.chatroomId
        })
        message.$search(function(messages) {
            console.log(messages)
            $scope.messages = messages["message"];
        });
    };
}]);
