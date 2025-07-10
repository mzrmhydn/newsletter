import express, { Router } from "express"
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

const adminEmail = process.env.EMAIL_USER
const adminPass = process.env.ADMIN_PASS

// /admin-login

router.post("/admin-login", (req, res) => {
    const { email, password } = req.body

    if (email === adminEmail && password === adminPass){
        return res.status(200).json({message: "Login Successful"})
    }
    else{
        return res.status(401).json({message: "Invalid Credentials"})
    }
})

export default router