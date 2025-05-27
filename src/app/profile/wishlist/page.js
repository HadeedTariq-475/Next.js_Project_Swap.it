import React from 'react'
import WishlistItemCard from '@/app/components/WishlistItemsCard'
import WishlistDonationCard from '@/app/components/WishlistDonationsCard'

export default function ListedItems() {
  return (
    <div>
      
      <h1 className="text-black text-2xl font-bold mb-6">Wishlist Items</h1>
       
      <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
        <WishlistItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <WishlistItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <WishlistItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <WishlistDonationCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <WishlistDonationCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <WishlistItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <WishlistItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <WishlistItemCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>                
        <WishlistItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>
        
        <WishlistDonationCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        <WishlistDonationCard img_src={"/images/pc2.webp"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"250"} credits={"3"} exchange_status={"Not Exchangable"}/>
        <WishlistItemCard img_src={"/images/pc3.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"750"} credits={"1"} exchange_status={"Exchangable"}/>

        <WishlistItemCard img_src={"/images/pc1.jpg"} title={"Used shoes"} desc={"Pretty useful for killing and other issues. You want your chingu dead Just a click away"} price={"450"} credits={"2"} exchange_status={"Exchangable"}/>
        

      </div>
    </div>
  )
}

