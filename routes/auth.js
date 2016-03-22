var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(8);

var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var knex = require('../db/knex');
var db_Users = require('../db/tbl_users');

passport.use(new LocalStrategy({
    usernameField: 'username'
  }, function(email, password, done) {
    db_Users.Get_User_By_Name(email).then(function(user){
      if(user && user.password !== null && bcrypt.compareSync(password, user.Password)) {
        return done(null, user);
      } else {
        return done(new Error('Invalid Email or Password'));
      }
    }).catch(function(err){
      return done(err);
    })
}));

passport.use(new BearerStrategy(function(token, done){
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded){
    if (err) return done(err);
    done(null, decoded.user);
  });
}));

function createToken(user, accessToken) {
  return new Promise(function(resolve, reject){
    delete user.password;
    var data = {
      user: user
    }

    if(accessToken) data.accessToken = accessToken;

    jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' },
      function(token) {
        resolve(token);
      });
  });
}

router.post('/signup', function(req, res, next) {
  var username = req.body.name;
  var phone_number = req.body.phone_number
  var receiveSMS = req.body.receiveSMS
  // Users().where('email', req.body.email).first().then(function(user){
    // if(!user) {
      var hash = bcrypt.hashSync(req.body.password, salt);
      db_Users.Add_User(username, hash, phone_number, receiveSMS).then(function(id) {
        createToken(username).then(function(token) {
          res.json({
            token: token
          });
        });
      });
    // }
    // else {
    //   res.status(409);
    //   res.redirect('/login.html?error=You have already signed up. Please login.');
    // }
  // });
});

router.post('/login', function(req, res, next){
  passport.authenticate('local',
  function (err, user, info){
    console.log("user: ", user);
    console.log("err: ", err);
    if(err) return next(err);
    if(user) {
      createToken(user).then(function(token) {
        res.json({
          token: token
        });
      });
    } else {
      next('Invalid Login');
    }
  })(req, res, next);
});

module.exports = {
  router: router,
  passport: passport,
  authenticate: function(req, res, next) {
    passport.authenticate('bearer', function(err, user, info) {
      req.user = user;
      next();
    })(req, res, next);
  }
};
