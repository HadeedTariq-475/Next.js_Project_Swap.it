import React from 'react'
import ListedItemCard from '@/app/components/ListedItemCard'
import ListedDonationCard from '@/app/components/ListedDonationCard'
import Link from 'next/link'

export default function MyItems() {
  return (
    <div>
      <h1 className="text-black text-2xl font-bold mb-6">My Items</h1>

      <div className='flex items-center gap-6'>
        <p className='text-black'>Listed Items</p>
        <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl'>New +</button>
      </div>

      <div className='grid grid-cols-3 gap-x-4 mt-4 mb-8'>  
        <ListedItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <ListedItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <ListedItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>
      </div>

      <Link href="/profile/my-items/listed-items">
        <p className='text-purple-500 text-center font-semibold'>Show All</p>
      </Link>
      
      <div className='flex items-center gap-6 mt-2'>
        <p className='text-black'>Donated Items</p>
        <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl'>New +</button>
      </div>

      <div className='grid grid-cols-3 gap-x-4 mt-4 mb-8'>  

        <ListedDonationCard img_src={"/images/p1dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"3"}/>
        <ListedDonationCard img_src={"/images/p2dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"2"}/>
        <ListedDonationCard img_src={"/images/p3dummy.jpg"} title={"Controller"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} credits={"4"}/>

      </div>
      
      <Link href="/profile/my-items/donated-items">
        <p className='text-purple-500 text-center font-semibold'>Show All</p>
      </Link>

    </div>
  )
}

