import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-3'>
        <div className="p-1 pt-0 logo font-bold text-3xl text-white ">
            <span className='text-blue-700'>&lt;</span>
            Lock
            <span className='text-blue-700'>Vault/&gt;</span>
        </div>
        <button className=''>
          <img className='invert p-6 w-20 cursor-pointer' src="icons/github.svg" alt="" />
        </button>
    </nav>
  )
}

export default Navbar
