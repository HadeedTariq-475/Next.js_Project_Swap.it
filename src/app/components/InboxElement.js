import React from 'react'
import Image from 'next/image'

export default function InboxElement() {
  return (
    <div>
        <div className='flex justify-between items-center px-3 py-2 cursor-pointer'>
                  <div className='flex'>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/images/dodge.jpg"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className='py-1 px-1'>
                      <p className='text-black text-xs font-semibold'>Hadeed</p>
                      <p className='text-gray-500 text-xs'>Doraemon, ha bara para</p>
                    </div>
                  </div>

                  <div>
                    <div className='text-white bg-purple-500 w-8 h-4 rounded-2xl text-xs'>
                      <span className='ml-1'>
                        New
                      </span>  
                    </div>
                    <p className='text-black text-xs ml-1 font-light pt-1'>6:34</p>
                  </div>

        </div>
    </div>
  )
}

