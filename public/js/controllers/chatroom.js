'use strict';
angular.module('chatapp.controllers.chatrooms', []).controller('ChatroomController', ['$scope', '$stateParams', '$location', 'Global', 'Chatroom', 'User', function ($scope, $stateParams, $location, Global, Chatroom, User) {
    $scope.global = Global;

    var socks = new SockJS('/echo');

    $scope.create_chatroom = function() {
        var chatroom = new Chatroom({
            title: this.title,
            mission: this.mission,
            members: this.members
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

    $scope.findUser = function() {
        User.query(function(users){
            $scope.users = users
            $scope.select2Options = {
                multiple: true,
                simple_tags: true,
                tags: ["hello","watsup"]
            }
        });
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

    // $scope.temporary_members = [];
    $scope.removeUser = function(user) {
        if (user) {
            console.log(user);
            var userRemove = new User(user);
            userRemove.chatroomId = $scope.chatroom._id
            userRemove.$search(function(members){
                $scope.temporary_members = members.members;
                socks.send('$scope.temporary_members');
            });
        }
        else {
            console.log("errors on errors on errors")
            // $scope.user.$remove();
            // $location.path('user');
        }
    };

    $scope.membersObject = {}
    socks.onmessage = function(e) {
        $scope.members = eval("("+e.data+")");
        console.log($scope.members)
        // $scope.temporary_members = [{name: "hello"}, {name: "hello"}, {name: "hello"}]
        $scope.$apply();
    };

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
            console.log(chatroom.members);
            console.log($scope.chatroom.creator);
        });
    };

    $scope.checkMember = function(chatroom){
        console.log(chatroom.members.indexOf($scope.global.user._id));
        console.log(chatroom.members.indexOf($scope.global.user._id) != -1 && true)
        return chatroom.members.indexOf($scope.global.user._id) != -1 && true
    }
    //this will be useful for finding someone specific through input
}]);












