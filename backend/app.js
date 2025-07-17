import express from 'express'
import dotenv from "dotenv"
import mongoose, { mongo } from 'mongoose'
import cors from "cors"
import authRoutes from "./routes/auth.js"
import broadcastRoutes from "./routes/broadcast.js"
import adminLoginRoutes from "./routes/adminlogin.js"
import session from 'express-session'
import passport from 'passport'
import "./passport-setup.js"

dotenv.config()
const app = express();
const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB"))

app.use(session({ 
    secret: "secret",
    resave: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/", authRoutes)
app.use("/", broadcastRoutes)
app.use("/", adminLoginRoutes)

app.listen(port, ()=>{
    console.log(`Server running on port${port}`)
})
