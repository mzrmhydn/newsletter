import React from "react"
import newsletterlogo from "../newsletter logo.jpg"
import { useLocation, useNavigate } from "react-router-dom"

export default function VerifyForm() {
  const [otp, setOtp] = React.useState("")
  const [message, setMessage] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  React.useEffect(() => {
    if (!email) {
      navigate('/', { replace: true })
    }
  }, [])

  const handleVerify = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div>
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

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <form
          className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 mt-16 space-y-6 border"
          onSubmit={handleVerify}
        >
          <h1 className="text-2xl font-bold text-center text-slate-800">Verify OTP</h1>
          <p className="text-sm text-gray-600 text-center">An OTP has been sent to {email}</p>

          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-transform transform hover:scale-105">
            VERIFY
          </button>

          {message && (
            <p className="text-sm text-center text-gray-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  )
}