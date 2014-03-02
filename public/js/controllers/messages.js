'use strict';
angular.module('chatapp.controllers.messages', []).controller('MessagesController', ['$scope', '$stateParams', '$location', 'Global', 'Message', function ($scope, $stateParams, $location, Global, Message) {
    $scope.global = Global;

    var sock = new SockJS('/echo');

    $scope.temporary_messages = [];

    var print = function(a, b, c) {
        return b+" : "+c+" "+a
    };

    $scope.create_message = function() {
        var message = new Message({
            content: this.content
        });

        message.$save(function(response){
            console.log(response)
            sock.send([response.created, response.creator.name, response.content])
        });

        this.content = '';
    };

    sock.onopen = function() {
        console.log('open');
    };

    sock.onmessage = function(e) {
        $scope.temporary_messages.push(print(e.data.split(",")[0], e.data.split(",")[1], e.data.split(",")[2]))
        $scope.$apply();
    };

    sock.onclose = function() {
        console.log('sockjs close');
    };

    $scope.find = function() {
        Message.query(function(messages) {
            $scope.messages = messages;
        });
    };
}]);
