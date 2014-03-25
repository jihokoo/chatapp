'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    LinkedinStrategy = require('passport-linkedin').Strategy,
    VenmoStrategy = require('passport-venmo').Strategy,
    User = mongoose.model('User'),
    config = require('./config');

module.exports = function(passport) {

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });

    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email: email
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                return done(null, user);
            });
        }
    ));

    // Use Venmo Strategy
    passport.use(new VenmoStrategy({
        clientID: config.venmo.clientID,
        clientSecret: config.venmo.clientSecret,
        callbackURL: config.venmo.callbackURL
      },
      function(accessToken, refreshToken, venmo, done) {
        User.findOne({
            'venmo.id': venmo.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            // checks if the user has been already been created, if not
            // we create a new instance of the User model
            if (!user) {
                user = new User({
                    name: venmo.displayName,
                    username: venmo.username,
                    email: venmo.email,
                    provider: 'venmo',
                    venmo: venmo._json,
                    balance: venmo.balance,
                    access_token: accessToken,
                    refresh_token: refreshToken
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                user.balance = venmo.balance;
                user.access_token = accessToken;
                user.venmo = venmo._json;
                user.save(function(err){
                    return done(err, user);
                });
            }
        });
      }
    ));

};



// F3ybz3PbhR6fDQeHhFMKA8UT7ryhSqZD
