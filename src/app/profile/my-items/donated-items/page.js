"use client"

import React from 'react'
import ListedDonationCard from '@/app/components/ListedDonationCard'
import AddDonatedItems from '@/app/components/AddDonatedItems'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function DonatedItems() {

    const [showAddDonationItemForm, setShowAddDonationItemForm] = useState(false);
    const [Donatedproducts, setDonatedProducts] = useState([]);

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = () => {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('userId='));

      if (!cookie) return; // just in case

      const userId = parseInt(cookie.split('=')[1]);
  
      axios.get('/api/userProducts', {
          params: { 
            id: userId,
            type: "DONATE"
          }
        })
        .then(res => {
          setDonatedProducts(res.data);  // <-- Store response in the products array
          console.log("Fetched products:", res.data); 
        })
        .catch(err => {
          console.error('Failed to fetch products:', err);
        });
      
    }

  return (
    <div>
      
            <div className='flex justify-between items-start mb-4'>
              <h1 className="text-black text-2xl font-bold mb-6">Donated Items</h1>
              <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl' onClick={() => setShowAddDonationItemForm(true)}>New +</button>
              {showAddDonationItemForm && <AddDonatedItems onClose={() => setShowAddDonationItemForm(false)} onItemAdded={fetchUserProducts}/>}
            </div>
      
            <div className='grid grid-cols-3 gap-x-4 mt-4 mb-8 min-h-48'>
                    {Donatedproducts.length > 0 ? (
                      Donatedproducts.slice().reverse().slice(0,3).map((product, index) => (
                        <ListedDonationCard
                          key={index}
                          id={product.id}
                          img_src={product.images?.[0]?.url || "/images/placeholder.jpg"}  // fallback image
                          title={product.title}
                          desc={product.description}
                          credits={product.credits.toString()}
                          onItemDelete={fetchUserProducts}
                        />
                      ))
                    ) : (
                      <p className="col-span-3 text-center text-black pt-56">No products listed for sale yet.</p>
                    )}
                  </div>
    </div>
  )
}

 