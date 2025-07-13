import React from "react";
import newsletterlogo from "../newsletter logo.jpg"
import { useNavigate } from "react-router-dom";

export default function SuccessRedirect(){
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const backendPort = process.env.REACT_APP_BACKEND_PORT
    //conflicting comment
    return(
        <>
            <header className="flex justify-center items-center  bg-blue-600 h-32 shadow-md border-b">
                <img
                    className="rounded-full w-20 h-20 mr-4"
                    src={newsletterlogo}
                    alt="newsletter-logo"
                />
                <button
                    onClick={() => navigate("/")}
                    className="text-3xl font-bold tracking-tight hover:text-slate-800 transition-colors"
                >
                    Newsletter Signup
                </button>
            </header>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-4">
                <h1 className="text-3xl font-bold text-green-700">
                    🥳 Google Login Successful!
                </h1>
                <p className="text-lg text-gray-700">
                    You will now receive our newsletter on your registered Email.
                </p>
            </div>
        </>
    )
}