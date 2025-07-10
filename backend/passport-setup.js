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
        const existingUserByEmail = await User.findOne({email: profile.emails[0].value})

        if(existingUserByEmail){
            const wasAlreadyVerified = existingUserByEmail.verified
            if(!existingUserByEmail.verified){
                existingUserByEmail.verified = true
                await existingUserByEmail.save()
            }
            const response = {
                user: existingUserByEmail,
                wasAlreadyVerified: wasAlreadyVerified
            }
            return done(null, response)
        }

        const newUser = await User.create({
            email: profile.emails[0].value,
            verified: true
        })

        const response = {
            user: newUser,
            wasAlreadyVerified: false
        }

        return done(null, response)
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