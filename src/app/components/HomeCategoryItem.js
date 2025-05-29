import React from 'react'
import Image from 'next/image'

export default function HomeCategoryItem({src,category,start}) {
  return (
    <div className={`col-span-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg ${start}`}>
        <Image src={src} alt={category} width={150} height={150}/>
        {category}
    </div>
  )
}

