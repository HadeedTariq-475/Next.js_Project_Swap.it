import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SideBarListItem from './SideBarListItem'


export default function SideBar() {
  return (
    <div>
        <div className='w-60 bg-[#EDE6F6] min-h-full mx-3'>
            <ul className='text-black '>
               
                <SideBarListItem href={"/profile/account-info"} label={"Account Info"}/>
                <SideBarListItem href={"/profile/my-items"} label={"My Items"}/>
                <SideBarListItem href={"/profile/wishlist"} label={"Wishlist"}/>
                <SideBarListItem href={"/profile/settings"} label={"Settings"}/>
                <SideBarListItem href={"/profile/change-password"} label={"Change Password"}/>
                <SideBarListItem href={"/profile/log-out"} label={"Log Out"}/>
                
            </ul>
        </div>  
    </div>
  )
}

