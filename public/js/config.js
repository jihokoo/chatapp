'use strict';

//Setting up route
angular.module('chatapp').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    })
      .state('chatroom', {
        url:'/chatroom',
        templateUrl: 'views/chatroom/view.html'
    })
      .state('create chatroom', {
        url:'/chatroom/create',
        templateUrl: 'views/chatroom/create.html'
    })
      .state('chatroom by id', {
        url:'/chatroom/:chatroomId',
        templateUrl: 'views/chatroom/individual.html'
    })
      .state('edit chatroom', {
        url:'/chatroom/:chatroomId/edit',
        templateUrl: 'views/chatroom/edit.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('chatapp').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
