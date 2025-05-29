"use client"

import React from 'react'
import Image from 'next/image'
import InboxElement from './InboxElement'
import ChatPanel from './ChatPanel'
import { useState } from 'react'

export default function InboxPanel({onClose}) {

  const [isOpen, setIsOpen] = useState(false)
    
  const OpenChat = () => setIsOpen(true)
  const CloseChat = () => setIsOpen(false)

  return (
    <div>
        <div className='bg-white text-black w-64 h-[310px] fixed bottom-0 right-3 rounded-t-2xl border border-gray-300 shadow-2xl z-50'>
            <h1 className='text-black text-xl font-bold mt-2 ml-3'>Messages</h1>
            <Image src={"/images/close.png"} alt="close" width={10} height={10} className='absolute top-2 right-2 cursor-pointer' onClick={onClose}/>

            {/*Search Bar*/}
            <div className="flex items-center">       
                <div className='relative'>
                  <input
                      type="text"
                      placeholder="Search"
                      className="bg-white w-60 py-1 
                      rounded-lg  border-[1px] border-black pl-4 text-black
                      focus:outline-none focus:ring-2 focus:ring-[#8139ed] ml-2 mt-2"
                  />
                  <div className='absolute top-3 right-1'>
                      <Image
                      src="/images/search-icon.png"
                      alt="Search Icon"
                      width={25}
                      height={25}
                      className='rounded-full cursor-pointer'
                  /></div>
                </div>
            </div>

            <div className='w-full flex-1 overflow-y-auto max-h-[220px] mt-2 pr-1 no-scrollbar'> 
              <div onClick={OpenChat}>
                <InboxElement/>
              </div>
              
              <InboxElement/>
              <InboxElement/>
              <InboxElement/>
              <InboxElement/>
              <InboxElement/>
              <InboxElement/>
            </div>

        </div>

        {isOpen && <ChatPanel onClose={CloseChat}/>}
    </div>
  )
}

