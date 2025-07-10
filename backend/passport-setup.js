import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20"
import dotenv from "dotenv"
import User from "./models/User.js"

dotenv.config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id})
        const existingUserByEmail = await User.findOne({email: profile.emails[0].value})

        if(existingUser){
            return done(null, existingUser)
        }

        if(existingUserByEmail){
            existingUserByEmail.googleId = profile.id
            existingUserByEmail.verified = true 

            await existingUserByEmail.save()
            return done(null, existingUserByEmail)
        }

        const newUser = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            verified: true
        })
        return done(null, newUser)
    } catch(error){
        return done(error,null)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})