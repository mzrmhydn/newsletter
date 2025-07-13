import React from "react";
import newsletterlogo from "../newsletter logo.png"
import { useNavigate } from "react-router-dom";

export default function SuccessRedirect(){
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const backendPort = process.env.REACT_APP_BACKEND_PORT
    
    return(
        <>
            <div className="flex bg-gradient-to-br from-[#2d033b] via-black to-[#1e3a8a] items-center justify-center h-screen px-4" >
                <div className="flex flex-col justify-center items-center space-y-4">
                    <h1 className="text-3xl font-bold text-green-700">
                        🥳 Google Login Successful!
                    </h1>
                    <p className="text-lg text-white">
                        You will now receive our newsletter on your registered Email.
                    </p>
                    <a className="text-blue-600 underline"  href="" onClick={() => navigate("/", { replace: true })}>👉🏼 Home Page.</a>
                </div>
            </div> 
        </>
    )
}