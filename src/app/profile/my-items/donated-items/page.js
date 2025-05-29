"use client"

import React from 'react'
import ListedDonationCard from '@/app/components/ListedDonationCard'
import AddDonatedItems from '@/app/components/AddDonatedItems'
import { useState } from 'react'

export default function DonatedItems() {

    const [showAddDonationItemForm, setShowAddDonationItemForm] = useState(false);

  return (
    <div>
      
            <div className='flex justify-between items-start mb-4'>
              <h1 className="text-black text-2xl font-bold mb-6">Donated Items</h1>
              <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl' onClick={() => setShowAddDonationItemForm(true)}>New +</button>
              {showAddDonationItemForm && <AddDonatedItems onClose={() => setShowAddDonationItemForm(false)} />}
            </div>
      
            <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
            
            <ListedDonationCard img_src={"/images/p1dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"3"}/>
            <ListedDonationCard img_src={"/images/p2dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"2"}/>
            <ListedDonationCard img_src={"/images/p3dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"4"}/>

            <ListedDonationCard img_src={"/images/p1dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"3"}/>
            <ListedDonationCard img_src={"/images/p2dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"2"}/>
            <ListedDonationCard img_src={"/images/p3dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"4"}/>

            <ListedDonationCard img_src={"/images/p1dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"3"}/>
            <ListedDonationCard img_src={"/images/p2dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"2"}/>
                 
      
            </div>
    </div>
  )
}

 