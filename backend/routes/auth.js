import express from "express"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import crypto from "crypto"
import User from "../models/User.js"
import passport from "passport"

dotenv.config()
const router = express.Router()
const port = process.env.PORT
const frontendPort = process.env.FRONTEND_PORT
const baseUrl = process.env.BASE_URL
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// /redirecting to google

router.get("/auth/google", 
    passport.authenticate("google", {scope: ["profile", "email"]})      
)

// /google sends user back

router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: baseUrl + frontendPort + "/fail" }),
    (req, res) => {
        if(req.user.wasAlreadyVerified){
            res.redirect(`${baseUrl + frontendPort}?email=${req.user.user.email}`)
        }
        else {
            res.redirect(baseUrl + frontendPort + "/success")
        }
    })

// /testing

router.get("/",(req, res) => {
    res.send("CHAL RAHA HAI NIGGA! ✅")
})

// /alreadyverified

router.get("/alreadyverified",async (req, res) => {
    const {email} = req.query
    if(!email){
        return res.json({message: "Email is required", verified: false})
    } 
    try {
        const user = await User.findOne({email})
        if(user && user.verified){
            return res.json({verified: true, message: "Email already verified."})
        } else {
            return res.json({verified: false, message: "Email not verified."})
        }
    } catch (err){
        console.error(err)
        return res.status(500).json({message: "Server error."})
    }
})

// /signup

router.post("/signup", async(req, res) => {
    const { email } = req.body
    if(!email){
        return res.status(400).json({message: "Email is required."})
    }

    const otp = crypto.randomInt(100000, 999999).toString()
    try{
        await User.findOneAndUpdate(
        {email: email},
        {otp: otp, expiresAt: Date.now() + 5 * 60 * 1000},
        {upsert: true, new: true}
    )
    } catch (error){
        return res.json({message:"Inserting User Failed."})
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Newsletter Signup",
            text: `Your OTP is ${otp}`
        })
        res.json({message: "Please check your email for OTP."})
    } catch (error){
        console.error("Email sending failed:", error)
        res.status(500).json({message: "Failed to send OTP to your Email."})
    }
})

// /verify(OTP)

router.post("/verify", async (req, res) => {
    const { email,otp } = req.body
    const record = await User.findOne({email: email})

    if(Date.now() > record.expiresAt){
        return res.status(400).json({message: "OTP expired."})
    }

    if(record.otp != otp){
        return res.status(400).json({message: "OTP incorrect."})
    }

    record.verified = true;
    res.json({message: "Email verified successfully, you will now receive our newsletter at your registered email address."})

    try{
        await User.findOneAndUpdate(
            { email },
            { verified: true},
            { upsert: true, new: true}
        )
    }
    catch(error){
        console.error("MongoDB save error: ", error)
        res.status(500).json({message: "Database Error."})
    }
})

export default router