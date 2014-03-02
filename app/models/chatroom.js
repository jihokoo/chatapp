'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Chatroom Schema
 */
var ChatroomSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    mission: {
        type: String,
        default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    members: {
        type: [Schema.ObjectId],
        ref: 'User'
    },
    messages: {
        type: [Schema.ObjectId]
    }
});

/**
 * Validations
 */
ChatroomSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ChatroomSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('creator', 'name username').exec(cb);
};

mongoose.model('Chatroom', ChatroomSchema);


