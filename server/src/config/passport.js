import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/user.js';
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.GOOGLE_OAUTH_CLIENT_ID)
console.log(process.env.GOOGLE_OAUTH_CLIENT_SECRET)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ 'gAuth.id': profile.id });
        if (!user) {
            console.log("Creating new user");
            // console.log(user)
            user = new User({
                email: profile.emails[0].value,
                name: profile.displayName,
                gAuth: profile,
                role: 'user',
                newsletterIsSubscribed: false
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        console.error("ERROR in config/passport.js", err);
        return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});

export default passport;