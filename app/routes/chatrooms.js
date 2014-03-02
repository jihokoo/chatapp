'use strict';

// chatrooms routes use chatrooms controller
var chatrooms = require('../controllers/chatrooms');
var authorization = require('./middlewares/authorization');

// chatroom authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.chatroom.creator.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/chatroom', chatrooms.all);
    app.post('/chatroom', authorization.requiresLogin, chatrooms.create);
    app.get('/chatroom/:chatroomId', chatrooms.show);
    app.put('/chatroom/:chatroomId', authorization.requiresLogin, hasAuthorization, chatrooms.update);
    app.del('/chatroom/:chatroomId', authorization.requiresLogin, hasAuthorization, chatrooms.destroy);

    // Finish with setting up the chatroomId param
    app.param('chatroomId', chatrooms.chatroom);

};
