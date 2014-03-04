'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Chatroom = mongoose.model('Chatroom'),
    _ = require('lodash');


/**
 * Find chatroom by id
 */
exports.chatroom = function(req, res, next, id) {
    Chatroom.load(id, function(err, chatroom) {
        if (err) return next(err);
        if (!chatroom) return next(new Error('Failed to load chatroom ' + id));
        req.chatroom = chatroom;
        next();
    });
};

/**
 * Create an chatroom
 */
exports.create = function(req, res) {
    var chatroom = new Chatroom(req.body);
    chatroom.creator = req.user;
    chatroom.members.push(req.user);
    console.log('backend controller');
    chatroom.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                chatroom: chatroom
            });
        } else {
            res.jsonp(chatroom);
        }
    });
};

/**
 * Update an chatroom
 */
exports.update = function(req, res) {
    var chatroom = req.chatroom;

    chatroom = _.extend(chatroom, req.body);

    chatroom.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                chatroom: chatroom
            });
        } else {
            res.jsonp(chatroom);
        }
    });
};

/**
 * Delete an chatroom
 */
exports.destroy = function(req, res) {
    var chatroom = req.chatroom;

    chatroom.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                chatroom: chatroom
            });
        } else {
            res.jsonp(chatroom);
        }
    });
};

/**
 * Show an chatroom
 */
exports.show = function(req, res) {
    console.log(req.chatroom)
    Chatroom.findOne({_id: req.chatroom._id}).populate('members', 'name').populate('creator', 'name').exec(function(err, chatroom){
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(chatroom);
        }
    })
};

/**
 * List of chatrooms
 */
exports.all = function(req, res) {
    Chatroom.find().sort('-created').populate('creator', 'name username').exec(function(err, chatrooms) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(chatrooms);
        }
    });
};
