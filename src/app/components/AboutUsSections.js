import React from 'react'
import Image from 'next/image'

export default function AboutUsSections({src,title,desc}) {
  return (
    <div>
        <div className='flex items-center flex-col '>
            <div className='bg-[#9C60F4] w-16 h-16 rounded-full relative'>
                <Image src={src} alt='24/7-Support' width={40} height={40} className='absolute top-3.5 left-3'/>
            </div>
            <p className='text-black text-base font-semibold mb-3'>{title}</p>
            <p className='text-gray-600 text-sm text-center'>{desc}</p>
        </div>
    </div>
  )
}
