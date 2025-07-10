import express from "express"
import dotenv from 'dotenv'
import nodemailer from "nodemailer"
import User from "../models/User.js"

dotenv.config()
const router = express.Router()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// /broadcast

router.post("/broadcast",async (req, res) => {
    const { text } = req.body
    let verifiedUsers; 
    try {
        verifiedUsers = await User.find({"verified": true})
    } catch (error) {
        console.error("Error in fetching users\n");
    }
    verifiedUsers.forEach(
        (vu) => {
            console.log("Sending email to ", vu.email);
        }
    )
    let sentToAll = true;
    for(let i = 0; i < verifiedUsers.length; i++){
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: verifiedUsers[i].email,
                subject: "Newsletter",
                text: text
            })
        } catch (error){
            sentToAll = false;
        }
    }
    
    if (sentToAll) {
        res.json({message: "Newsletter sent successfully."})
    } else {
        res.status(500).json({message: "Failed to send newsletter to your Email."})
    }
})

export default router
