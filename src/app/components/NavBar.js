'use client'

import React from "react";
import Link from "next/link";
import { useState , useEffect } from "react";
import Image from "next/image";
import InboxPanel from "./InboxPanel";
import { useRouter } from "next/navigation";



export default function NavBar() {

  const router = useRouter()

  const [creditCount, setCreditCount] = useState(2)
  const [messageCount, setmessageCount] = useState(4)
  const [notificationCount, setnotificationCount] = useState(3)

  const [isOpen, setIsOpen] = useState(false)
  
  const OpenInbox = () => setIsOpen(true)
  const CloseInbox = () => setIsOpen(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
      // Check if userId cookie exists
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('userId='));
  
      if (cookie) {
        setIsLoggedIn(true);
          
        // Simulate fetching user data based on userId
        // You can replace this with real API call
        const userId = cookie.split('=')[1];
        
      }
    }, []);

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
            <Link href="/#Home">Home</Link>
          </li>
          <li className="ml-7 hover:text-[#8139ed] hover:underline">
            <Link href="/#About">About</Link>
          </li>
          <li className="ml-7 hover:text-[#8139ed] hover:underline">
            <Link href="/AllCategories">Shop</Link>
          </li>
        </ul>
      </div>
      {/* Right Section */}
        <div className="flex mr-4">
          {isLoggedIn &&
          (<div className="flex ">
            <Image src="/images/credits.png" alt="credits" width={30} height={25} />
            <span className="text-black mt-2 ml-1">{creditCount}</span>
          </div>) 
          }
          <Link href="/Donations">
            <Image src="/images/donation-icon.png" alt="donation" width={27} height={27} className="-scale-x-100 ml-4 mt-1" />
          </Link>
          <Link href={isLoggedIn ? "/profile/wishlist" : "/loginPage"}>
            <Image src="/images/wishlist.png" alt="wishlist" width={20} height={20} className="ml-4 mt-2"/>
          </Link>
          {/*Messaging icon*/}
            <div className="relative ml-4">
              <Image src="/images/message-icon.png" alt="messages" width={20} height={20} className="relative top-1 mt-1 cursor-pointer" 
              onClick={() => 
                {
                  if(isLoggedIn){ 
                    OpenInbox
                  } 
                  else{
                    router.push("/loginPage")
                  } 
                }
              }/>
              {isOpen && <InboxPanel onClose={CloseInbox}/>}
              {isLoggedIn &&
              (<div className="bg-[#FFFB0D] rounded-full w-[15px] h-[15px] text-black absolute -top-1 -right-1">
                <span className="relative left-1 -top-1.5 text-xs ">{messageCount}</span>
              </div>)
              }
            </div>
          
          {/*Notification*/}
            <div className="relative ml-4">
              <Image src="/images/notification-icon.png" alt="messages" width={20} height={20} className="relative top-1 mt-1"/>
              {isLoggedIn && 
              (<div className="bg-[#FFFB0D] rounded-full w-[15px] h-[15px] text-black absolute -top-1 -right-1">
                <span className="relative left-1 -top-1.5 text-xs ">{notificationCount}</span>
              </div>)
              } 
            </div>
          
          <Link href={isLoggedIn ? "/profile/account-info" : "/loginPage"}>
            <Image src="/images/profile-icon.png" alt="profile" width={24} height={24} className="ml-4 mt-1"></Image> 
          </Link>
        </div>  
    </div>
  );
}
