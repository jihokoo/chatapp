'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.articles', 'mean.articless', 'chatapp']);

angular.module('chatapp', ['chatapp.controllers', 'chatapp.services', 'chatapp.directives']);
angular.module('chatapp.controllers', ['chatapp.controllers.chatrooms', 'chatapp.controllers.messages']);
angular.module('chatapp.services', ['chatapp.services.chatrooms', 'chatapp.services.messages']);
