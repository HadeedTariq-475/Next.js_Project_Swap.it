"use client";
import React , {useState} from 'react';
import { useParams } from "next/navigation";
import { useEffect } from 'react';
import NavBar from '/src/app/components/NavBar';  
import Footer from '/src/app/components/Footer';
import ProductGrid  from '/src/app/components/ProductGrid';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

function SellerProfile({}) {

    const params = useParams();
    const id = params.id;


    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [seller, setSeller] = useState(null);
    
    useEffect(() => {
        if (!id) return;

        const cookie = document.cookie.split('; ').find(row => row.startsWith('userId='));
        if (cookie) setIsLoggedIn(true);

        axios.get('/api/User', { params: { id } })
            .then(res => {
                setSeller(res.data);
                console.log("Fetched seller:", res.data);
            })
            .catch(err => {
                console.error('Failed to fetch seller:', err);
            });

        Promise.all([
            axios.get('/api/userProducts', { params: { id, type: "BUY" } }),
            axios.get('/api/userProducts', { params: { id, type: "DONATE" } }),
        ])
            .then(([res1, res2]) => {
                setProducts([...res1.data, ...res2.data]);
                
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
            });
    }, [id]);

    if (!seller) 
        return (<div className='flex justify-center items-center text-black'>
            <p>Loading seller profile...</p>
                </div>)
     

  return (
    <div>
        <NavBar></NavBar>
        <div className='bg-[#EDE6F6] w-full rounded-md h-10 mt-5'></div>
        <div>
            <div className='relative w-[1240] h-[100px] sm:h-[200px] md:h-[250px] lg:h-[180px] ml-8 mt-4'>
                <Image
                    src="/images/sellerProfile_Card.png"
                    alt="Seller Profile"
                    width={1200}
                    height={180}    
                    className='rounded-lg'
                />
            </div>
            <div className="absolute top-44 left-10 w-[200px] h-[200px] rounded-full overflow-hidden">
                <Image
                    src={seller.profilePic == null ? "/images/profile.jpg" : seller.profilePic}
                    alt="Seller Profile"
                    fill
                    className="object-cover rounded-full"
                />
            </div>

            <div className='text-black ml-64 -mt-12 flex justify-between items-center mr-16 '>
                <div>
                    <strong className='text-xl'>{seller.firstName} {seller.lastName}</strong><br></br>
                    <b className='text-sm'>{new Date(seller.createdAt).getFullYear()}</b><br></br>
                    <span>{seller.phone == null ? "" : seller.phone}</span><br></br>
                    <span className='text-md ml-1'>{seller.country == null ? "" : seller.country}</span>
                    <span className='bg-[#cbb3f0] w-32 flex justify-center font-semibold'>{products.length} Items Listed</span>
                </div>
                <Link href={isLoggedIn ? "#" : "/loginPage"}>
                    <div className="flex justify-center p-0  bg-[#ad82ed] rounded-sm text-white text-sm  font-bold tracking-wider w-28 h-8">
                        <Image
                            src="/images/message-icon.png"
                            alt="Seller"
                            width={20}
                            height={20}
                            className="m-2"
                        />
                        <button> 
                            Say Hi! 
                        </button>
                    </div>
                </Link>
                
            </div>
            <div className="flex justify-between items-center mb-6 mt-12 text-[13px] font-bold text-black mx-16">
                <span className="lg:text-[20px] tracking-wide">Listed Items:</span>
                <div className="flex items-center gap-2">
                    <label>Type</label>
                    <select className="border border-black w-32 h-7 rounded-md focus:outline-none font-medium px-2 py-1">
                    <option>All</option>
                    <option>Buy</option>
                    <option>Exchange</option>
                    <option>Donate</option>
                    </select>
                </div>
            </div>
            <div className='ml-14 mb-8'>
                <ProductGrid products={products} />
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default SellerProfile