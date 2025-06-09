"uae client"
import React from 'react'
import Image from 'next/image'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function WishlistItemCard({id,productId ,img_src, title, desc, type,price, credits, exchange_status,onItemDelete}) {

  const router = useRouter()

    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (successMessage || errors) {
          const timer = setTimeout(() => {
            setSuccessMessage("");
            setErrors("");
          }, 4000);
          return () => clearTimeout(timer);
        }
    }, [successMessage, errors]);

  
    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
        const res = await axios.delete(`/api/userWishlist?ID=${id}`);


        const data = res.data;

        setSuccessMessage('Product deleted successfully');
        onItemDelete()
        // Optionally refetch or remove from UI state here
        } catch (err) {
        console.error('Error:', err);
        setErrors(err.response?.data?.error || 'Something went wrong while deleting.');
        }
    };

    const handleClick = () => {
    router.push(`/ProductDetail/${productId}`)
  }


  return (
    <div onClick={handleClick}>
          {(successMessage || errors) && (
              <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 transition-all duration-300 
                  ${successMessage ? "bg-green-500" : "bg-red-500"} text-white`}
              >
                {successMessage || errors}
              </div>
            )}
          <div className='bg-purple-200 w-[305px] h-44 rounded-2xl flex shadow-md shadow-gray-500 transition-transform hover:scale-105 hover:shadow-black cursor-pointer'>
    
            <Image
              src={img_src}
              alt="img"
              width={130}
              height={170}
              className='rounded-tl-2xl rounded-bl-2xl object-cover'
            />
    
            <div className='p-3 w-full overflow-hidden'>
              <h3 className='text-black text-sm font-semibold truncate line-clamp-1 overflow-hidden'>{title}</h3>
    
              <p className='text-gray-700 text-xs mt-2 min-h-[3rem] line-clamp-3 break-words overflow-hidden'>
                {desc}
              </p>
              {
                type == "BUY" ? (
                    <div className='flex justify-between items-center mt-3'>
                        <div className='flex items-center'>
                        <Image src="/images/price-tag_b.png" alt="price tag" width={25} height={25} />
                        <span className='text-black ml-1 text-sm font-semibold'>Rs.{price}</span>
                        </div>
                        <div className='flex items-center'>
                        <Image src="/images/credits.png" alt="credits" width={25} height={25} />
                        <span className='text-black ml-1 text-sm font-semibold'>{credits}</span>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center mt-3'>
                        <div className='flex items-center'>
                        <Image src="/images/credits.png" alt="credits" width={25} height={25} />
                        <span className='text-black ml-1 text-sm font-semibold'>{credits}</span>
                        </div>
                    </div>
                )
              }
              {
                type == "BUY" ? (
                    <div className='flex justify-between items-center mt-2 gap-3'>
                        <p className='text-black text-xs '>{exchange_status}</p>
                        <div className='flex w-full justify-end items-center '>
                        <div className='bg-red-600 w-6 h-6 rounded-sm flex justify-center items-center cursor-pointer' onClick={(e) => { e.stopPropagation(); handleDelete()}}>
                            <Image src="/images/delete.png" alt="delete item" width={18} height={18} />
                        </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-end items-center mt-2 gap-3'>
                        <div className='bg-red-600 w-6 h-6 rounded-sm flex justify-center items-center cursor-pointer' onClick={(e) => { e.stopPropagation(); handleDelete()}}>
                            <Image src="/images/delete.png" alt="delete item" width={18} height={18} />
                        </div>  
                    </div>  
                )
              } 
            </div>
    
          </div>
        </div>
  )
}
