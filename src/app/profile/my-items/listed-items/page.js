"use client"

import React from 'react'
import ListedItemCard from '@/app/components/ListedItemCard'
import AddListedItem from '@/app/components/AddListedItem'
import { useState } from 'react'

export default function ListedItems() {

  const [showAddItemForm, setShowAddItemForm] = useState(false);

  return (
    <div>
      <div className='flex justify-between items-start mb-4'>
        <h1 className="text-black text-2xl font-bold mb-6">Listed Items</h1>
        <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl' onClick={() => setShowAddItemForm(true)}>New +</button>
        {showAddItemForm && <AddListedItem onClose={() => setShowAddItemForm(false)} />}
      </div>

      <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>                
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>
        
        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>                
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

      </div>
    </div>
  )
}

