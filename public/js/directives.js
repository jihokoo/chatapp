'use strict';

angular.module('chatapp.directives', [])
  .directive('positions', function() {
    return {
      restrict: "E",
      templateUrl: "views/messages/messages.html"
    };
  })
  .directive('ngpopup', function($compile){
    return {
    restrict: 'C',
    scope: {
      controller: '='
    },
    controller: function($scope, $element, $attrs, $templateCache) {
      $scope.$on('open_ngpopup', function(e, args) {
                if (args.id != $attrs.popupid) return;

                var template = $templateCache.get(args.template);
                $("#curtain").html($compile(template)($scope)).fadeIn(180);

                $("#curtain .close").bind('click', function() {
                    $("#curtain").fadeOut(180, function() {
                      $(this).empty();
                    });
                    $scope.$parent.$broadcast('didclose_ngpopup', {popupid:$attrs.popupid, controller:$scope.controller});
                });
            });
    }
  }
  })
