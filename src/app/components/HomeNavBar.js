'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeNavBar() {

  const [scrolled, setScrolled] = useState(false);
  const [creditCount] = useState(2);
  const [messageCount] = useState(4);
  const [notificationCount] = useState(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>

      {/* Navbar */}
      <div
        className={`fixed w-full z-50 flex items-start justify-between px-6 py-3 transition-all duration-500 group ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        } hover:bg-white`}
      >
        {/* Logo */}
        <div
          className={`relative min-w-[120px] transition-all duration-700 ${
            scrolled ? "w-[50px] h-[50px]" : "w-[120px] h-[120px]"
          } group-hover:w-[50px] group-hover:h-[50px]`}
        >
          <Image
            src="/images/swap.ItLogo.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>


        {/* Nav Links */}
        <ul className="flex gap-8 text-black font-medium ml-28">
          <li className="hover:text-purple-600 hover:underline"><Link href="#">Home</Link></li>
          <li className="hover:text-purple-600 hover:underline"><Link href="#">About</Link></li>
          <li className="hover:text-purple-600 hover:underline"><Link href="#">Contact</Link></li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center text-black">
            <Image src="/images/credits.png" alt="credits" width={30} height={30} />
            <span className="ml-1">{creditCount}</span>
          </div>
          <Image src="/images/donation-icon.png" alt="donate" width={30} height={30} className="-scale-x-100" />
          <Image src="/images/wishlist.png" alt="wishlist" width={30} height={30} />
          
          <div className="relative">
            <Image src="/images/message-icon.png" alt="msg" width={25} height={25} />
            <div className="bg-yellow-300 rounded-full w-4 h-4 text-black text-xs absolute -top-1 -right-1 flex items-center justify-center">{messageCount}</div>
          </div>

          <div className="relative">
            <Image src="/images/notification-icon.png" alt="notif" width={25} height={25} />
            <div className="bg-yellow-300 rounded-full w-4 h-4 text-black text-xs absolute -top-1 -right-1 flex items-center justify-center">{notificationCount}</div>
          </div>

          <Image src="/images/profile-icon.png" alt="profile" width={30} height={30} />
        </div>
      </div>
    </div>
  );
}
