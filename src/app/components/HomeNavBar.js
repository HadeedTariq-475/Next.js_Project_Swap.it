'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InboxPanel from "./InboxPanel";

export default function HomeNavBar() {

  const [scrolled, setScrolled] = useState(false);
  const [creditCount] = useState(2);
  const [messageCount] = useState(4);
  const [notificationCount] = useState(3);

  const [isOpen, setIsOpen] = useState(false)

  const OpenInbox = () => setIsOpen(true)
  const CloseInbox = () => setIsOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>

      {/* Navbar */}
      <div
        className={`fixed w-full z-50 flex items-start justify-between px-4 py-2 transition-all duration-500 group ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        } hover:bg-white`}
      >
        {/* Logo */}
        <div
          className={`relative min-w-[80px] transition-all duration-700 ${
            scrolled ? "w-[35px] h-[35px]" : "w-[80px] h-[80px]"
          } group-hover:w-[35px] group-hover:h-[35px]`}
        >
          <Image
            src="/images/swap.ItLogo.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>


        {/* Nav Links */}
        <ul className="flex gap-8 text-black font-normal ml-28">
          <li className="hover:text-purple-600 hover:underline"><Link href="#">Home</Link></li>
          <li className="hover:text-purple-600 hover:underline"><Link href="#">About</Link></li>
          <li className="hover:text-purple-600 hover:underline"><Link href="#">Contact</Link></li>
        </ul>

        {/* Right Section */}
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
              <Image src="/images/message-icon.png" alt="messages" width={20} height={20} className="relative top-1 mt-1 cursor-pointer" onClick={OpenInbox}/>
              {isOpen && <InboxPanel onClose={CloseInbox}/>}
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

      {isOpen && <InboxPanel onClose={CloseInbox}/>}
    </div>
  );
}
