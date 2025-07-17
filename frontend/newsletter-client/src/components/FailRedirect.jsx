import newsletterlogo from "../newsletter logo.png"
import { useNavigate } from "react-router-dom"

export default function FailRedirect(){
    const navigate = useNavigate()
    return(
        <>
        <div className="flex bg-gradient-to-br from-[#2d033b] via-black to-[#1e3a8a] items-center justify-center h-screen px-4" >
            <div className="flex flex-col items-center justify-center h-screen text-center space-y-4 px-4">
                <h1 className="text-3xl font-bold text-red-600">❌ Login Failed</h1>
                <p className="text-white">
                    Something went wrong with Google Sign-In. Please try again.
                </p>
                <a className="text-blue-600 underline"  href="" onClick={() => navigate("/", { replace: true })}>👉🏼 Home Page.</a>
                <p className="text-sm font-semibold self-end justify-self-center">Made by <a className="underline" href="https://www.linkedin.com/in/mazhar-mohyudin-6ab0b8260/">Mazhar Mohyudin</a></p>
            </div>
        </div>
        </>
    )
}