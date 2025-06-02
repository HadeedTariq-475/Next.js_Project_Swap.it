"use client"

import ListedItemCard from '@/app/components/ListedItemCard'
import ListedDonationCard from '@/app/components/ListedDonationCard'
import Link from 'next/link'
import AddListedItem from '@/app/components/AddListedItem'
import AddDonatedItems from '@/app/components/AddDonatedItems'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MyItems() {

  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showAddDonationItemForm, setShowAddDonationItemForm] = useState(false);
  const [Listedproducts, setListedProducts] = useState([]);
  const [Donatedproducts, setDonatedProducts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const handleEditItem = (item) => {
    setEditingItem(item);
    if(item.type === "BUY"){
      setShowAddItemForm(true);
    }
    else{
      setShowAddDonationItemForm(true)
    }
    
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

        setEditingItem(null);
      
    }
  

  return (
    <div>
      <h1 className="text-black text-2xl font-bold mb-6">My Items</h1>

      <div className='flex items-center gap-6'>
        <p className='text-black'>Listed Items</p>
        <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl' onClick={() => setShowAddItemForm(true)}>New +</button>
        {showAddItemForm && <AddListedItem onClose={() => setShowAddItemForm(false)} onItemAdded={fetchUserProducts} editingItem={editingItem}  />}
      </div>

      <div className='grid grid-cols-3 gap-x-4 mt-4 mb-8 min-h-48'>
        {Listedproducts.length > 0 ? (
          Listedproducts.slice().reverse().slice(0,3).map((product, index) => (
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
          <p className="col-span-3 text-center text-black pt-20">No products listed for sale yet.</p>
        )}
      </div>

      {Listedproducts.length > 3 ? (
        <Link href="/profile/my-items/listed-items">
        <p className='text-purple-500 text-center font-semibold'>Show All</p>
        </Link>
      ) : (
        ""
      )}
      
      
      <div className='flex items-center gap-6 mt-2'>
        <p className='text-black'>Donated Items</p>
        <button className='text-white bg-purple-500 border-none outline-none px-5 py-2 rounded-2xl' onClick={() => setShowAddDonationItemForm(true)}>New +</button>
        {showAddDonationItemForm && <AddDonatedItems onClose={() => setShowAddDonationItemForm(false)} onItemAdded={fetchUserProducts} editingItem={editingItem}/>}
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
              onEditClick={handleEditItem}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-black pt-20">No products Donated yet.</p>
        )}
      </div>
      
      {Donatedproducts.length > 3 ? (
        <Link href="/profile/my-items/donated-items">
        <p className='text-purple-500 text-center font-semibold'>Show All</p>
        </Link>
      ) : (
        ""
      )}
      

    </div>
  )
}

