'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Chatroom = mongoose.model('Chatroom'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.render('users/signout', {user: null});
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

exports.all = function(req, res){
    User.find(function(err, users){
        res.jsonp(users);
    })
};

exports.destroy = function(req, res) {
    Chatroom.findOne({_id: req.body.chatroomId}, function(err, chatroom){
        var index = chatroom.members.indexOf(req.body._id);
        console.log(chatroom.members);
        chatroom.members.splice(index, 1);
        console.log(chatroom.members);
        chatroom.save(function(err){
            Chatroom.findOne({_id: chatroom._id}).populate('members').populate('creator').exec(function(err, chatroom){
                console.log(chatroom.members)
                res.jsonp({members: chatroom.members});
            });
        });

    });
};





