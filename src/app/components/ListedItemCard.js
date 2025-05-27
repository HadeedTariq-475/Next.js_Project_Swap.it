import React from 'react'
import Image from 'next/image'

export default function ListedItemCard({img_src,title,desc,price,credits,exchange_status}) {
  return (
    <div>
        <div className='bg-purple-200 w-[305px] h-44 rounded-2xl flex shadow-md shadow-gray-500'>

            <Image src={img_src} alt="img" width={130} height={170} className='rounded-tl-2xl rounded-bl-2xl '/>
            <div className='p-3'>
                <h3 className='text-black '>{title}</h3>
                <p className='text-gray-700 text-xs mt-2'>{desc}</p>
                <div className='flex justify-between items-center mt-3'>
                    <div className='flex items-center'> 
                        <Image src="/images/price-tag_b.png" alt="price tag" width={25} height={25}/>
                        <span className='text-black ml-1 text-sm font-semibold'>${price}</span>
                    </div>
                    <div className='flex items-center'> 
                        <Image src="/images/credits.png" alt="credits" width={25} height={25}/>
                        <span className='text-black ml-1 text-sm font-semibold'>{credits}</span>
                    </div> 
                </div>
        
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-black text-xs'>{exchange_status}</p>
                    <div className='flex items-center gap-x-1'>
        
                        <div className='bg-purple-500 w-6 h-6 rounded-sm'>
                          <Image src="/images/edit-item.png" alt="edit item" width={18} height={18} className='mt-0.5 ml-1'/>
                        </div>
                        <div className='bg-red-600 w-6 h-6 rounded-sm'>
                          <Image src="/images/delete.png" alt="edit item" width={18} height={18} className='mt-0.5 ml-1'/>
                        </div>  
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}
