'use strict';

// messages routes use messages controller
var messages = require('../controllers/messages');
var authorization = require('./middlewares/authorization');

// message authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.message.creator.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/message', messages.all);
    app.post('/message', authorization.requiresLogin, messages.create);
    app.get('/message/:messageId', messages.show);
    app.put('/message/:messageId', authorization.requiresLogin, hasAuthorization, messages.update);
    app.del('/message/:messageId', authorization.requiresLogin, hasAuthorization, messages.destroy);

    // Finish with setting up the messageId param
    app.param('messageId', messages.message);

};
