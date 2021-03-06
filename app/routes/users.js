'use strict';

// User routes use users controller
var users = require('../controllers/users');
var request = require('request');
module.exports = function(app, passport) {

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);


    app.get('/user', users.all);

    app.put('/user/:userId', users.destroy);

    // Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);


    app.get('/auth/venmo', passport.authenticate('venmo', {
        scope: ['make_payments', 'access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/venmo/callback', passport.authenticate('venmo', {
        failureRedirect: '/signin'
    }), users.authCallback);

    app.post('/auth/venmo/payment', function(req, res){
        //using the request library with a callback
        request.post('https://api.venmo.com/v1/payments', {form: req.body}, function(e, r, venmo_receipt){
            // parsing the returned JSON string into an object
            var venmo_receipt = JSON.parse(venmo_receipt);
            res.render('success', {venmo_receipt: venmo_receipt});
        });
    });

    // Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.authCallback);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the linkedin oauth routes
    app.get('/auth/linkedin', passport.authenticate('linkedin', {
        failureRedirect: '/signin',
        scope: [ 'r_emailaddress' ]
    }), users.signin);

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/siginin'
    }), users.authCallback);

};
