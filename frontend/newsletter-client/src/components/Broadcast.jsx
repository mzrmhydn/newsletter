import React from "react"
import newsletterlogo from "../newsletter logo.png"
import { useLocation, useNavigate } from "react-router-dom"

export default function Broadcast() {
  const [text, setText] = React.useState("")
  const [message, setMessage] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.state?.isAdmin
  const backendURL = process.env.REACT_APP_BACKEND_URL

  React.useEffect(() => {
    if (!isAdmin) {
      return navigate('/', { replace: true })
    }
  }, [])

  const sendBroadcast = async (e) => {
    e.preventDefault()
    const res = await fetch(backendURL + "/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div className="flex bg-gradient-to-br from-[#2d033b] via-black to-[#1e3a8a] items-center justify-center h-screen px-4">
      <form
        className="flex flex-col justify-center items-center w-full max-w-xl bg-gray-100 rounded-2xl shadow-md p-8 mt-12 space-y-6 border"
        onSubmit={sendBroadcast}
      >
        <h2 className="text-3xl font-bold text-left text-[#221a7b]">Broadcast Newsletter</h2>

        <textarea
          className="w-full h-64 bg-slate-300 placeholder-slate-500 placeholder:font-semibold mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#221a7b] resize-none"
          placeholder="Enter message to broadcast"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button className="mb-4 w-fit  border-[#221a7b] border-2 bg-[#221a7b] hover:shadow-xl text-white px-4 py-2 rounded-full font-medium transition-transform transform hover:scale-105">
          Send
        </button>

        {message && (
          <p className="text-sm text-center text-gray-500 mt-2">{message}</p>
        )}
      </form>
    </div>
  )
}