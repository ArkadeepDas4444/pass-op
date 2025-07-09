import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-wrap w-full bg-amber-200 p-0.5 justify-center items-center gap-1 font-semibold text-xs text-center md:text-sm'>
        <span>Created with</span>
        <img src="https://img.icons8.com/tiny-color/24/like.png" alt="like" className='size-5 md:size-6'/>
        <span>by Arkadeep Das</span>
      </div>
  )
}

export default Footer