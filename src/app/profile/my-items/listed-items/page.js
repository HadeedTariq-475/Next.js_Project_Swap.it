"use client"

import React from 'react'
import ListedItemCard from '@/app/components/ListedItemCard'
import AddListedItem from '@/app/components/AddListedItem'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function ListedItems() {

  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [Listedproducts, setListedProducts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  
  useEffect(() => {
      fetchUserProducts();
    }, []);

    const handleEditItem = (item) => {
      setEditingItem(item);
      setShowAddItemForm(true);
    };
  
    const fetchUserProducts = () => {
        const cookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='));
  
        if (!cookie) return; // just in case
  
        const userId = parseInt(cookie.split('=')[1]);
  
        axios.get('/api/userProducts', {
            params: { 
              id: userId,
              type: "BUY"
            }
          })
          .then(res => {
            setListedProducts(res.data);  // <-- Store response in the products array
            console.log("Fetched products:", res.data); 
          })
          .catch(err => {
            console.error('Failed to fetch products:', err);
          }); 

          setEditingItem(null);
      }

  return (
    <div>
      <div className='flex justify-between items-start mb-4'>
        <h1 className="text-black text-2xl font-bold mb-6">Listed Items</h1>
        <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl' onClick={() => setShowAddItemForm(true)}>New +</button>
        {showAddItemForm && <AddListedItem onClose={() => setShowAddItemForm(false)} onItemAdded={fetchUserProducts} editingItem={editingItem}/>}
      </div>

          <div className='grid grid-cols-3 gap-x-4 gap-y-6 mt-4 mb-8 min-h-48'>
              {Listedproducts.length > 0 ? (
                Listedproducts.slice().reverse().map((product, index) => (
                  
                  <ListedItemCard
                    key={index}
                    id={product.id}
                    img_src={product.images?.[0]?.url || "/images/placeholder.jpg"}  // fallback image
                    title={product.title}
                    desc={product.description}
                    price={product.price.toString()}
                    credits={product.credits.toString()}
                    exchange_status={product.exchange ? "Exchangable" : "Not Exchangable"}
                    onItemDelete={fetchUserProducts}
                    onEditClick={handleEditItem}
                  />
                  
                ))
              ) : (
                <p className="col-span-3 text-center text-black pt-56">No products listed for sale yet.</p>
              )}
            </div>
    </div>
  )
}

