'use strict';

angular.module('chatapp.directives', [])
  .directive('positions', function() {
    return {
      restrict: "E",
      templateUrl: "views/messages/messages.html"
    };
  })
