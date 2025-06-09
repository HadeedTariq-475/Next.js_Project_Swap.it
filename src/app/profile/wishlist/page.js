"use client"
import React from 'react'
import WishlistItemCard from '@/app/components/WishlistItemsCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function WishlistItems() {

  const [Wishlistproducts, setWishlistProducts] = useState([]);

  useEffect(() => {
      fetchUserProducts();
    }, []);
  
  const fetchUserProducts = () => {
        const cookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='));
  
        if (!cookie) return; // just in case
  
        const userId = parseInt(cookie.split('=')[1]);
  
        axios.get('/api/userWishlist', {
            params: { 
              id: userId
            }
          })
          .then(res => {
            setWishlistProducts(res.data);  // <-- Store response in the products array
            console.log("Fetched products:", res.data); 
          })
          .catch(err => {
            console.error('Failed to fetch products:', err);
          }); 
      }
  

  return (
    <div>
      
      <h1 className="text-black text-2xl font-bold mb-6">Wishlist Items</h1>
      <div className='grid grid-cols-3 gap-x-4 gap-y-6 mt-4 mb-8 min-h-48'>
        {Wishlistproducts.length > 0 ? (
          Wishlistproducts.slice().reverse().map((wishlist, index) => (
            
            <WishlistItemCard
              key={index}
              id={wishlist.id}
              productId={wishlist.product.id}
              img_src={wishlist.product.images?.[0]?.url || "/images/placeholder.jpg"}  // fallback image
              title={wishlist.product.title}
              desc={wishlist.product.description}
              type={wishlist.product.type}
              price={wishlist.product.price.toString()}
              credits={wishlist.product.credits.toString()}
              exchange_status={wishlist.product.exchange ? "Exchangable" : "Not Exchangable"}
              onItemDelete={fetchUserProducts}
            />
            
            ))
          ) : (
            <p className="col-span-3 text-center text-black pt-56">No products in Wishlist yet.</p>
          )}
      </div>  
    </div>
  )
}

