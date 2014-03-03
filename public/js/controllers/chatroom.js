'use strict';
angular.module('chatapp.controllers.chatrooms', []).controller('ChatroomController', ['$scope', '$stateParams', '$location', 'Global', 'Chatroom', function ($scope, $stateParams, $location, Global, Chatroom) {
    $scope.global = Global;

    $scope.create_chatroom = function() {
        var chatroom = new Chatroom({
            title: this.title,
            mission: this.mission
        });
        chatroom.$save(function(response){
            $location.path('chatroom/' + response._id);
        });
        //create a different page
        //on click of the create room button you are directed to another page
        //use the same controller for the all the chat html docs
        //on submitting the new chat group, you are directed back to the main chat
        //page that lists that chat rooms
        this.title = '';
        this.mission = '';
    };




// where do i want to go from here

// i need render a view page that will show
// a list of all the groups that the user is in


// i need to create a property in the user that will show his/her groups

// we populate groups by the user

// the creator of the group will be stored as data in the group model
// and then just added to the other members to signify that creator
// is also a member, this is important when other people created the group

// or can we check if the groups members array contains the user id?
// if so then we can iterate through all groups
// but this would mean we iterate through each group as opposed to
// knowing exactly which ones to look for

// we display them in a list, when list is generated next to the button
// should be a edit or remove button, this will take us to a form



    $scope.remove = function(chatroom) {
        if (chatroom) {
            chatroom.$remove();

            for (var i in $scope.chatrooms) {
                if ($scope.chatrooms[i] === chatroom) {
                    $scope.chatrooms.splice(i, 1);
                }
            }
        }
        else {
            $scope.chatroom.$remove();
            $location.path('chatroom');
        }
    };
    //comes with the list which we will include later

    $scope.update = function() {
        var chatroom = $scope.chatroom;
        if (!chatroom.updated) {
            chatroom.updated = [];
        }
        chatroom.updated.push(new Date().getTime());

        chatroom.$update(function() {
            $location.path('chatroom/' + chatroom._id);
        });
    };
    //this will also come after we generate our list of chatrooms
    //this is for adding new member and kicking out others

    $scope.find = function() {
        Chatroom.query(function(chatrooms) {
            $scope.chatrooms = chatrooms;
        });
    };
    //this will be useful for generating the list of groups or people

    $scope.findOne = function() {
        Chatroom.get({
            chatroomId: $stateParams.chatroomId
        }, function(chatroom) {
            $scope.chatroom = chatroom;
            $scope.members = chatroom.members;
            console.log(chatroom.members)
            console.log($scope.chatroom.creator.name);
        });
    };
    //this will be useful for finding someone specific through input
}]);
