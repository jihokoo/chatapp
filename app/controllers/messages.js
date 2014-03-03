'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    Chatroom = mongoose.model('Chatroom'),
    _ = require('lodash');


/**
 * Find message by id
 */
exports.message = function(req, res, next, id) {
    Message.load(id, function(err, message) {
        if (err) return next(err);
        if (!message) return next(new Error('Failed to load message ' + id));
        req.message = message;
        next();
    });
};

/**
 * Create an message
 */
exports.create = function(req, res) {
    var message = new Message({content: req.body.content, username: req.body.username});
    message.creator = req.user;
    message.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                message: message
            });
        } else {
            console.log("hello")
            //need to get chatroom somehow
            Chatroom.findOne({_id: req.body.chatroomId}, function(err, chatroom){
                Message.load(message._id, function(err, message){
                    chatroom.messages.push(message);
                    chatroom.save();
                    res.jsonp(message);
                });
            });
        }
    });
};

/**
 * Update an message
 */
exports.update = function(req, res) {
    var message = req.message;

    message = _.extend(message, req.body);

    message.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                message: message
            });
        } else {
            res.jsonp(message);
        }
    });
};

/**
 * Delete an message
 */
exports.destroy = function(req, res) {
    var message = req.message;

    message.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                message: message
            });
        } else {
            res.jsonp(message);
        }
    });
};

/**
 * Show an message
 */
exports.show = function(req, res) {
    res.jsonp(req.message);
};

/**
 * List of messages
 */
exports.all = function(req, res) {
    Chatroom.findOne({_id: req.body.chatroomId}).populate('messages', 'username created content').exec(function(err, chatroom){
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log("hello")
            res.jsonp({message: chatroom.messages});
        }
    });
};
