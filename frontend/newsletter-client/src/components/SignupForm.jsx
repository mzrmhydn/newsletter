import React from "react"
import newsletterlogo from "../newsletter logo.png"
import { useNavigate, useSearchParams } from "react-router-dom"
import googleLogo from "../googlelogo.png"

export default function SignupForm() {
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [adminPass, setAdminPass] = React.useState("")
  const navigate = useNavigate()
  const backendURL = process.env.REACT_APP_BACKEND_URL
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
        const verifyRes = await fetch(`${backendURL}/alreadyverified?email=${email}`)
        const verifyData = await verifyRes.json()
        if(verifyData.verified){
          setMessage(`${email} is already verified. You will receive our newsletter.`)
          return
        }

        const res = await fetch(backendURL + "/signup", {
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
        const res = await fetch(backendURL + "/admin-login", {
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
    <div className="flex bg-gradient-to-br from-[#2d033b] via-black to-[#1e3a8a] items-center justify-center h-screen px-4">
      <form
        className="flex w-[1200px] h-[600px] bg-white rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="w-3/5" >
          <img className="h-full rounded-l-2xl place-self-center " src={newsletterlogo} alt="newsletter-logo" />
        </div>
        <div className="flex flex-col rounded-r-2xl justify-center bg-gray-100 p-8 w-2/5 h-full" >
          <h2 className="text-3xl font-bold text-left text-[#221a7b] mb-0"> 
            SIGN UP
          </h2>
          <h2 className="mb-4 text-3xl font-bold text-left text-[#221a7b]">
            {isAdmin ? "AS ADMIN TO BROADCAST" : "FOR OUR E-NEWSLETTER"}
          </h2>
          {!isAdmin && <p className="text-[#221a7b] text-sm mb-4">
            Join our mailing list to stay in the loop with the latest updates, exclusive offers, and helpful tips—straight to your inbox.
          </p>}
          <input
            className="bg-slate-300 placeholder-slate-500 placeholder:font-semibold w-3/4 mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#221a7b]"
            type="email"
            placeholder={isAdmin?"Admin Email": "Your Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {isAdmin && (
            <input
              className="bg-slate-300 placeholder-slate-500 placeholder:font-semibold w-3/4 mb-4 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#221a7b]"
              type="password"
              placeholder="Admin password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              required
            />
          )}

        
          <button className="mb-4 w-fit  border-[#221a7b] border-2 bg-[#221a7b] hover:shadow-xl text-white px-4 py-2 rounded-full font-medium transition-transform transform hover:scale-105">
            {isAdmin ? "Login as Admin" : "Submit"}
          </button>
          {!isAdmin && <a
            href={process.env.REACT_APP_GOOGLE_AUTH_URL}
          >
            <button
              type="button"
              className="flex mb-4 border-[#221a7b] border-2 bg-[#221a7b] hover:shadow-xl text-white pr-3 pl-2 py-2 rounded-full font-medium transition-transform transform hover:scale-105"
            >
              <img className="w-6 h-6 mr-3" src={googleLogo} alt="google-logo" />
              Sign Up with Google
            </button>
          </a>}
          <div className="flex space-x-2">
            <input
              onChange={() => setIsAdmin((prev) => !prev)}
              className="h-4 w-4 ml-2 rounded-full hover:scale-105 text-blue-600 border-gray-300 focus:ring-blue-500"
              type="checkbox"
              id="sign-up-as-admin"
            />
            <label htmlFor="sign-up-as-admin" className="text-sm text-gray-700">
              Sign up as Admin
            </label>
          </div>
          {message && (
            <p className="text-sm text-center text-red-600 mt-2">{message}</p>
          )}
        </div>
      </form>
    </div>
  )
}