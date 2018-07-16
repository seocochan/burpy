const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const TwitterStrategy  = require('passport-twitter').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
  // user.id는 profile.id가 아닌 mongod에 의해 생성된 oid임.
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy : true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ Id: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      console.log(profile._json)
      const user = await new User({ 
        Id: profile.id, 
        name : profile.displayName, 
        provider : 'google'
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new TwitterStrategy({
    consumerKey : keys.twitterClientID,
    consumerSecret : keys.twitterClientSecret,
    callbackURL : '/auth/twitter/callback',
    proxy : true
  },
  async(token,tokenSecret,profile,cb)=>{
    const existingUser = await User.findOne({Id : profile.id});
    if(existingUser){
      return cb(null,existingUser);
    }
    console.log(profile._json)
    const user = await new User({
      Id : profile.id,
      name : profile.displayName,
      provider : 'twitter'
    }).save();
    cb(null,user);
  })
);

passport.use(
  new NaverStrategy({
    clientID : keys.naverClientID,
    clientSecret : keys.naverClientSecret,
    callbackURL : '/auth/login/naver/callback',
    proxy : true
  },
  async(accessToken,refreshToken,profile,done)=>{
    console.log('hi');
    const existingUser = await User.findOne({Id : profile.id});
    if(existingUser){
      return done(null,existingUser);
    }
    console.log(profile._json)
    const user = await new User({
      Id : profile.id,
      name : profile.displayName,
      provider : 'naver'
    }).save();
    done(null,user);
  })
);

