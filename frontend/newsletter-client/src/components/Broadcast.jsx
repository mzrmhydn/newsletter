import React from "react"
import newsletterlogo from "../newsletter logo.jpg"
import { useLocation, useNavigate } from "react-router-dom"

export default function Broadcast() {
  const [text, setText] = React.useState("")
  const [message, setMessage] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.state?.isAdmin

  React.useEffect(() => {
    if (!isAdmin) {
      return navigate('/', { replace: true })
    }
  }, [])

  const sendBroadcast = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div>
      <header className="flex justify-center items-center  bg-blue-600 h-32 shadow-sm border-b">
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
          className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 mt-12 space-y-6 border"
          onSubmit={sendBroadcast}
        >
          <h2 className="text-xl font-semibold text-slate-800 text-center">Broadcast Newsletter</h2>

          <textarea
            className="w-full h-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter message to broadcast"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-transform transform hover:scale-105">
            Send
          </button>

          {message && (
            <p className="text-sm text-center text-gray-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  )
}