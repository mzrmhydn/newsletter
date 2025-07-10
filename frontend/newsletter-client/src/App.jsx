import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupForm from "./components/SignupForm"
import VerifyForm from "./components/VerifyForm"
import Broadcast from "./components/Broadcast"
import SuccessRedirect from './components/SuccessRedirect'
import FailRedirect from './components/FailRedirect'

export default function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupForm />} />
        <Route path='/verify' element={<VerifyForm />} />
        <Route path='/broadcast' element={<Broadcast />} />
        <Route path='/success' element={<SuccessRedirect />} />
        <Route path='/fail' element={<FailRedirect />} />
      </Routes>
    </Router>
    </>
  )
}