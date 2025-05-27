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
      <div className="flex px-3">
        <Image 
          src="/images/swap.ItLogo.png" 
          alt="swap.it-logo"
          width={50}
          height={50}
           />
        <ul className="flex justify-evenly items-center text-gray-400 text-sm">
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
      <div className="flex mr-4">
        <div className="flex ">
          <Image src="/images/credits.png" alt="credits" width={30} height={25} />
          <span className="text-black mt-2 ml-1">{creditCount}</span>
        </div>
        <Link href="#">
          <Image src="/images/donation-icon.png" alt="donation" width={27} height={27} className="-scale-x-100 ml-4 mt-1" />
        </Link>
        <Link href="#">
          <Image src="/images/wishlist.png" alt="wishlist" width={20} height={20} className="ml-4 mt-2"/>
        </Link>
        <Link href="#">
          <div className="relative ml-4">
            <Image src="/images/message-icon.png" alt="messages" width={20} height={20} className="relative top-1 mt-1"/>
            <div className="bg-[#FFFB0D] rounded-full w-[15px] h-[15px] text-black absolute -top-1 -right-1">
              <span className="relative left-1 -top-1.5 text-xs ">{messageCount}</span>
            </div> 
          </div>
        </Link>
        <Link href="">
          <div className="relative ml-4">
            <Image src="/images/notification-icon.png" alt="messages" width={20} height={20} className="relative top-1 mt-1"/>
            <div className="bg-[#FFFB0D] rounded-full w-[15px] h-[15px] text-black absolute -top-1 -right-1">
              <span className="relative left-1 -top-1.5 text-xs ">{notificationCount}</span>
            </div> 
          </div>
        </Link>
        <Link href="#">
          <Image src="/images/profile-icon.png" alt="profile" width={24} height={24} className="ml-4 mt-1"></Image> 
        </Link>
      </div>
    </div>
  );
}
