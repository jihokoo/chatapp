'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles',
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: 'views/articles/view.html'
    })
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
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
