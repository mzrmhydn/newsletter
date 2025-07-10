import React, { useEffect } from "react";
import newsletterlogo from "../newsletter logo.jpg"
import { replace, useNavigate } from "react-router-dom";

export default function SuccessRedirect(){
    const[user, setUser] = React.useState(null)
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const backendPort = process.env.REACT_APP_BACKEND_PORT

    useEffect(() => {
        fetch(`${baseUrl + backendPort}/auth/status`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if(!data.loggedIn){
                navigate("/", { replace: true })
            }
            else {
                setUser(data.user)
            }
        })
        . catch((error) => {
            console.error("Auth check failed: ", error)
            navigate("/", { replace: true })
        })
    }, [])

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
                {user? <p className="text-lg text-gray-700">
                    Welcome {user.email}! You will now receive our newsletter.
                </p>: <p className="text-gray-500"> Loading... </p>}
            </div>
        </>
    )
}