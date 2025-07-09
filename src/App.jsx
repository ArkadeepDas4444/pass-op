import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <div className='relative flex grow justify-center'>
        <div className="absolute inset-0 -z-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
        <Manager/>
      </div>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default App