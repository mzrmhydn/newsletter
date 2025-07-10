import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    verified: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    otp: {type: String}
})


export default mongoose.model("User", userSchema)