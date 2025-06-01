'use client'

import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LogOut() {

  const router = useRouter();

  const [user, setUser] = useState(null);

    useEffect(() => {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('userId='));

      if (!cookie) return; // just in case

      const userId = cookie.split('=')[1];

      axios.get('/api/User', {
          params: { id: userId }
        })
        .then(res => {
          setUser(res.data);
          console.log("Fetched user:", res.data); 
        })
        .catch(err => {
          console.error('Failed to fetch user:', err);
        });
    }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/LogOut', { withCredentials: true });
      if (res.status === 200) {
        router.push('/'); // or your home page
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
  
  return (
    <div>
      <h1 className="text-black text-2xl font-bold mb-16">Log Out</h1>

      <div className='bg-purple-200 w-[570px] h-72 m-auto rounded-xl relative'>
        <Image src={"/images/LogOut.png"} alt='LogOut' width={400} height={400} className='absolute -top-20 left-16 opacity-40'/>
        <div className='absolute z-10 text-black p-6'>
          <h2 className=' text-2xl font-semibold'>LEAVING SO SOON?</h2>
          <p>
            {user
              ? `“Hey ${user.firstName} ${user.lastName}, are you sure you want to log out?"`
              : ''}
          </p>
          <p className='mt-8'>You're about to log out from SWAP.IT. Make sure you've saved your changes and checked any pending swaps or donations. Any unsaved activity will be lost.</p>
          <div className='flex justify-between items-center mt-8'>
            <p>Do you want to proceed?</p>
            <button className='bg-purple-500 px-4 py-2 text-white rounded-lg' onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>

    </div>
  );
}
