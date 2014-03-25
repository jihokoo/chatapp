'use strict';

//Global service for global variables
angular.module('chatapp.services.global', []).factory('Global', [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user
        };

        return _this._data;
    }
]);
