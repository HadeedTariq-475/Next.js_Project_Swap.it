import React from 'react'
import Image from 'next/image'

export default function AboutUsSections({src,title,desc}) {
  return (
    <div>
        <div className='flex items-center flex-col '>
            <div className='bg-[#9C60F4] w-24 h-24 rounded-full relative'>
                <Image src={src} alt='24/7-Support' width={60} height={60} className='absolute top-5 left-4'/>
            </div>
            <p className='text-black text-lg font-bold mb-3'>{title}</p>
            <p className='text-gray-500 text-sm text-center'>{desc}</p>
        </div>
    </div>
  )
}
