"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListedDonationCard({id, img_src,title,desc,credits,onItemDelete}) {

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
      const res = await axios.delete(`/api/userProducts?ID=${id}`);

      const data = res.data;

      setSuccessMessage('Product deleted successfully');
      onItemDelete()
      // Optionally refetch or remove from UI state here
    } catch (err) {
      console.error('Error:', err);
      setErrors(err.response?.data?.error || 'Something went wrong while deleting.');
    }
  };


  return (
    <div>
      {(successMessage || errors) && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 transition-all duration-300 
              ${successMessage ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {successMessage || errors}
          </div>
        )}
        <div className='bg-purple-200 w-[305px] h-44 rounded-2xl flex shadow-md shadow-gray-500'>

            <Image src={img_src} alt="img" width={130} height={170} className='rounded-tl-2xl rounded-bl-2xl '/>
            <div className='p-3 w-full overflow-hidden'>
                <h3 className='text-black '>{title}</h3>
                <p className='text-gray-700 text-xs mt-2 min-h-[3rem] line-clamp-3 break-words overflow-hidden'>{desc}</p>
                <div className='flex items-center mt-3'>
                        <Image src="/images/credits.png" alt="credits" width={25} height={25}/>
                        <span className='text-black ml-1 text-sm font-semibold'>{credits}</span>
                </div>
        
                <div className='w-full mt-2 flex justify-end'>
                    <div className='flex items-center gap-x-1'>
                        <div className='bg-purple-500 w-6 h-6 rounded-sm cursor-pointer'>
                          <Image src="/images/edit-item.png" alt="edit item" width={18} height={18} className='mt-0.5 ml-1'/>
                        </div>
                        <div className='bg-red-600 w-6 h-6 rounded-sm cursor-pointer' onClick={handleDelete}>
                          <Image src="/images/delete.png" alt="edit item" width={18} height={18} className='mt-0.5 ml-1'/>
                        </div>  
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}
