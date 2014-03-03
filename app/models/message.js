'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Chatroom Schema
 */
var MessageSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    }
    //maybe there is a need for storing the recievers of the message
    //but not for now
});

/**
 * Validations
 */
MessageSchema.path('content').validate(function(content) {
    return content.length;
}, 'content cannot be blank');

/**
 * Statics
 */
MessageSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('creator', 'name username').exec(cb);
};




mongoose.model('Message', MessageSchema);
