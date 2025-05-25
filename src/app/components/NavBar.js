'use client'

import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";



export default function NavBar() {

  const [creditCount, setCreditCount] = useState(2)
  const [messageCount, setmessageCount] = useState(4)
  const [notificationCount, setnotificationCount] = useState(3)

  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <Image 
          src="/images/swap.ItLogo.png" 
          alt="swap.it-logo"
          width={70}
          height={70}
           />
        <ul className="flex justify-evenly items-center text-gray-400 ">
          <li className="ml-7 hover:text-[#8139ed] hover:underline">
            <Link href="#">Home</Link>
          </li>
          <li className="ml-7 hover:text-[#8139ed] hover:underline">
            <Link href="#">About</Link>
          </li>
          <li className="ml-7 hover:text-[#8139ed] hover:underline">
            <Link href="#">Shop</Link>
          </li>
        </ul>
      </div>
      <div className="flex">
        <div className="flex ">
          <Image src="/images/credits.png" alt="credits" width={30} height={40} />
          <span className="text-black mt-1 ml-1">{creditCount}</span>
        </div>
        <Link href="#">
          <Image src="/images/donation-icon.png" alt="donation" width={32} height={32} className="-scale-x-100 ml-4 mt-1" />
        </Link>
        <Link href="#">
          <Image src="/images/wishlist.png" alt="wishlist" width={25} height={25} className="ml-4 mt-2"/>
        </Link>
        <Link href="#">
          <div className="relative ml-4">
            <Image src="/images/message-icon.png" alt="messages" width={25} height={25} className="relative top-1 mt-1"/>
            <div className="bg-[#FFFB0D] rounded-full w-4 h-4 text-black absolute top-0 -right-1">
              <span className="relative left-1 -top-1 text-sm ">{messageCount}</span>
            </div> 
          </div>
        </Link>
        <Link href="">
          <div className="relative ml-4">
            <Image src="/images/notification-icon.png" alt="messages" width={25} height={25} className="relative top-1 mt-1"/>
            <div className="bg-[#FFFB0D] rounded-full w-4 h-4 text-black absolute top-0 -right-1">
              <span className="relative left-1 -top-1 text-sm ">{notificationCount}</span>
            </div> 
          </div>
        </Link>
        <Link href="#">
          <Image src="/images/profile-icon.png" alt="profile" width={30} height={30} className="ml-4 mr-3 mt-1"></Image> 
        </Link>
      </div>
    </div>
  );
}
