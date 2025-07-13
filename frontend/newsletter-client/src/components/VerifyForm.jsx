import React from "react"
import newsletterlogo from "../newsletter logo.png"
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
      <div className="flex bg-gradient-to-br from-[#2d033b] via-black to-[#1e3a8a] items-center justify-center h-screen px-4">
        <form
          className="flex w-[1200px] h-[600px] bg-white rounded-2xl shadow-lg"
          onSubmit={handleVerify}
        >
          <div className="w-3/5" >
            <img className="h-full rounded-l-2xl place-self-center " src={newsletterlogo} alt="newsletter-logo" />
          </div>
          <div className="flex flex-col rounded-r-2xl justify-center bg-gray-100 p-8 w-2/5 h-full" >
            <h2 className="text-3xl font-bold text-left text-[#221a7b] mb-4"> 
              VERIFY EMAIL
            </h2>
            <p className="text-[#221a7b] text-sm mb-4">An OTP has been sent to {email}</p>

            <input
              className="bg-slate-300 placeholder-slate-500 placeholder:font-semibold w-3/4 mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#221a7b]"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button className="mb-4 w-fit  border-[#221a7b] border-2 bg-[#221a7b] hover:shadow-xl text-white px-4 py-2 rounded-full font-medium transition-transform transform hover:scale-105">
              VERIFY
            </button>
            {message && (
              <p className="text-[#221a7b] text-sm ">{message}</p>
            )}
          </div>

        </form>
      </div>
  )
}