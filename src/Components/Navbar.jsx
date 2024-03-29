import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-blue-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>Vivek</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold translate-all'>Home</li>
            <li className='cursor-pointer hover:font-bold translate-all'>Vi-Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar