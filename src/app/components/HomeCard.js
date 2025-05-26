import React from 'react'
import Image from 'next/image'

export default function HomeCard({src,title,desc,label}) {
  return (
    <div>
        <div className='flex flex-col items-center'>
            <div className='w-[270px] h-[370px] bg-white rounded-3xl shadow-md shadow-gray-400'>
              <Image src={src} alt='Buy Now' width={300} height={150}  className='rounded-t-3xl'/>
              <div className='mt-3 ml-3'>
                <h2 className='text-black text-lg font-bold mb-2'>{title}</h2>
                <p className='text-black text-sm'>{desc}</p>
              </div>
            </div>
            <button className='flex text-xl justify-start items-center bg-[#9C60F4] px-6 py-3 rounded-xl mt-4 mr-4'>
              {label}
              <Image src="/images/ArrowRight.png" alt='Arrow' width={25} height={25} className='ml-2'/>
            </button>
          </div>
    </div>
  )
}

