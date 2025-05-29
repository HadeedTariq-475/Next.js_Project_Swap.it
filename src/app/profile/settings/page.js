import React from 'react'


export default function Settings() {
  return (
    <div>

      <h1 className="text-black text-2xl font-bold mb-16">Settings</h1>

      <div className='flex flex-col border-[0.5px] border-black rounded-md mb-8 mx-8'>
        <div className=' px-6 py-4 border-b-[0.5px] border-black'>
          <p className='text-black text-xl font-semibold'>My Ads Settings</p>
        </div>
        <div className='flex justify-between items-center px-6 py-4'>
          <p className='text-black text-lg '>Show my phone number in ads</p>
          <input type='checkbox' defaultChecked className='w-5 h-5 accent-purple-500'/>
        </div>
      </div>

      <div className='flex flex-col border-[0.5px] border-black rounded-md mx-8'>
        <div className=' px-6 py-4 border-b-[0.5px] border-black'>
          <p className='text-black text-xl font-semibold'>Notifications</p>
        </div>
        <div className='flex justify-between items-center px-6 py-4'>
          <p className='text-black text-lg '>Show Notifications of latest Products</p>
          <input type='checkbox' defaultChecked className='w-5 h-5 accent-purple-500'/>
        </div>
      </div>

    </div>
  )
}

