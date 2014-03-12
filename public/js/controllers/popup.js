'use strict';

angular.module('chatapp.controllers.popup', []).controller('PopupController', ["$scope", "$http", "$templateCache",
  function ($scope, $http, $templateCache) {
    $scope.externalPopupController = {
      open: function(popupid) {
        var templateCacheId = 'example1-template';
              var html = $templateCache.get(templateCacheId);
              if (!html) {
                  $http.get('views/popup.html').success(function(html) {
                      loadDidComplete(html);
                  });
              }
              else loadDidComplete(html);
              function loadDidComplete(html) {
                  $templateCache.put(templateCacheId, html);
                  $scope.$broadcast('open_ngpopup', {id:popupid, template:templateCacheId});
              }
      },
      header: "The Header #1"
    }

    $scope.inlinePopupController = {
      open: function(popupid, templateId) {
        $scope.$broadcast('open_ngpopup', {id:popupid, template:templateId});
      },
      counter: 1,
      header: 'The Header #2'
    }

    $scope.$on('didclose_ngpopup', function(e, args) {
      if (args.popupid == 'inline')
        args.controller.counter ++;
    })
  }]
);
