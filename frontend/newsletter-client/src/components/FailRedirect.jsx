import newsletterlogo from "../newsletter logo.jpg"
import { useNavigate } from "react-router-dom"

export default function FailRedirect(){
    const navigate = useNavigate()
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-3xl font-bold text-red-600">❌ Login Failed</h1>
                <p className="text-gray-700 mt-4">
                    Something went wrong with Google Sign-In. Please try again.
                </p>
            </div>
        </>
    )
}