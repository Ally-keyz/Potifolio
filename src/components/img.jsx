import React from 'react'
import me from"../assets/aa.png"
import TypewriterPlaceholder from './writer'

function Img() {
  return (
    <div>
      <div className="flex relative top-[-20px] justify-center sm:w-[600px] w-full p-5 rounded-md h-[400px] scale-80 cursor-pointer hover:scale-110 transition-all duration-500 bg-white">
        <div className=""><img src={me} className='sm:w-[600px] w-full h-[400px] rounded-l-md' /></div>
        <div className="w-full rounded-r-md bg-zinc-800 p-5 h-[400px]">
          <p className='text-center text-[18px] font-semibold text-green-300'>What coding is about?</p>
          <p className='text-center text-[16px] font-semibold text-white'>It's about consistency</p>
          <p className='text-center text-[16px] font-semibold text-white'>It's about determination</p>
          <p className='text-center text-[16px] font-semibold text-white'>It's about love</p>
          <div className="mt-20">
            <TypewriterPlaceholder />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Img