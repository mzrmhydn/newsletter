import React from "react"
import newsletterlogo from "../newsletter logo.jpg"
import { useNavigate, useSearchParams } from "react-router-dom"
import googleLogo from "../googlelogo.png"

export default function SignupForm() {
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [adminPass, setAdminPass] = React.useState("")
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BASE_URL
  const backendPort = process.env.REACT_APP_BACKEND_PORT
  const [searchParams] = useSearchParams()
  const emailFromGoogle = searchParams.get("email")

  React.useEffect(() => {
    if(emailFromGoogle){
      setMessage(`${emailFromGoogle} is already verified. You will receive our newsletter.`)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin){
      try {
        const verifyRes = await fetch(`${baseUrl+backendPort}/alreadyverified?email=${email}`)
        const verifyData = await verifyRes.json()
        if(verifyData.verified){
          setMessage(`${email} is already verified. You will receive our newsletter.`)
          return
        }

        const res = await fetch(baseUrl + backendPort + "/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        })
        const data = await res.json()
        setMessage(data.message)

        if (res.ok) {
          navigate("/verify", { state: { email } })
        } else {
          alert("Failed to send OTP")
        }
      } catch (error) {
        console.log(error)
        setMessage(error)
      }
    } else {
      try {
        const res = await fetch(baseUrl + backendPort + "/admin-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: adminPass })
        })
        const data = await res.json()
        setMessage(data.message)

        if (res.ok) {
          navigate("/broadcast", { state: { isAdmin: true } })
        } else {
          alert("Failed to redirect to broadcast page")
        }
      } catch (error) {
        console.log(error)
        setMessage(error)
      }
    }
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
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-slate-800">
            Sign up as {isAdmin ? "Admin" : "User"}
          </h2>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder={isAdmin?"Enter admin Email": "Enter your Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {isAdmin && (
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter admin password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              required
            />
          )}

          <div className="flex flex-col space-y-4 items-center justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-transform transform hover:scale-105">
              {isAdmin ? "Login as Admin" : "Get OTP"}
            </button>
            <div className="flex space-x-2">
              <input
                onChange={() => setIsAdmin((prev) => !prev)}
                className="h-4 w-4 hover:scale-105 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                type="checkbox"
                id="sign-up-as-admin"
              />
              <label htmlFor="sign-up-as-admin" className="text-sm text-gray-700">
                Sign up as Admin
              </label>
            </div>
            {!isAdmin && <a
              href={process.env.REACT_APP_GOOGLE_AUTH_URL}
              className="w-full"
            >
              <button
                type="button"
                className="flex place-self-center border-2 border-black hover:shadow-xl hover:bg-slate-200 bg-gray-100 px-6 py-2 rounded-lg font-medium transition-transform transform hover:scale-105"
              >
                <img className="w-8 h-8 mr-4" src={googleLogo} alt="google-logo" />
                Sign Up with Google
              </button>
            </a>}
          </div>
          {message && (
            <p className="text-sm text-center text-gray-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  )
}