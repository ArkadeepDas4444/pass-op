import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex flex-wrap w-full justify-around items-center text-sm md:text-base'>
      <div className='grow-1 bg-violet-900 p-1 content-center font-bold text-center text-gray-100'>PassOp</div>
      <ul className='flex flex-wrap grow-2 bg-amber-200 font-semibold text-gray-900 items-center'>
        <li className='grow p-1 text-center hover:bg-amber-500'><a href="/" className='hover:font-bold'>Home</a></li>
        <li className='grow p-1 text-center hover:bg-amber-500'><a href="#" className='hover:font-bold'>About</a></li>
        <li className='grow p-1 text-center hover:bg-amber-500'><a href="#" className='hover:font-bold'>Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar