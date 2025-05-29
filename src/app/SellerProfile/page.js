"use client";
import React , {useState} from 'react';
import { useEffect } from 'react';
import NavBar from '/src/app/components/NavBar';  
import Footer from '/src/app/components/Footer';
import ProductGrid  from '/src/app/components/ProductGrid';
import Image from 'next/image';

function SellerProfile() {

        const [products, setProducts] = useState([]);
    
        //For page number
        const [currentPage, setPage] = useState(1);
        const productsPerPage = 9;
    
        //
        const lastPageIndex = currentPage * productsPerPage;
        const firstPageIndex = lastPageIndex - productsPerPage;
        const currentProducts = products.slice(firstPageIndex, lastPageIndex);
        
        // Fake data load for checking the UI
            useEffect(() => {
                setProducts([
                    {id: 1,title: "Virtual Reality Headset",credits: 2,price: 1500,type: "Buy",category: "Electronics",image: "/images/p1dummy.jpg",description: "Experience immersive gaming with this high-quality VR headset.",},
                    {id: 2,title: "Dual Side Conroller",credits: 1,price: 500,type: "Donate",category: "Kids",image: "/images/p2dummy.jpg",description: "Fully functional with no scratches or defects. Ideal for immersive gaming .....",},
                    {id: 3,title: "PS-Controller",credits: 0,price: 500,type: "Exchange",category: "Others",image: "/images/p3dummy.jpg",description: "A high-quality PS controller in excellent condition, perfect for gaming enthusiasts.Moreover, it is compatible with various gaming consoles and PCs, ensuring a seamless gaming experience.",},
                    {id: 4, title: "PS-Controller",credits: 0,price: 500,type: "Exchange",category: "Others",image: "/images/p3dummy.jpg",description: "A high-quality PS controller in excellent condition, perfect for gaming enthusiasts.Moreover, it is compatible with various gaming consoles and PCs, ensuring a seamless gaming experience.",},
                    {id: 5,title: "Virtual Reality Headset",credits: 2,price: 1500,type: "Buy",category: "Electronics",image: "/images/p1dummy.jpg",description: "Experience immersive gaming with this high-quality VR headset.",},
                    {id: 6,title: "Dual Side Conroller",credits: 1,price: 500,type: "Donate",category: "Kids",image: "/images/p2dummy.jpg",description: "Fully functional with no scratches or defects. Ideal for immersive gaming .....",},
                    {id: 7,title: "PS-Controller",credits: 0,price: 500,type: "Exchange",category: "Others",image: "/images/p3dummy.jpg",description: "A high-quality PS controller in excellent condition, perfect for gaming enthusiasts.Moreover, it is compatible with various gaming consoles and PCs, ensuring a seamless gaming experience.",},
                    {id: 8, title: "PS-Controller",credits: 0,price: 500,type: "Exchange",category: "Others",image: "/images/p3dummy.jpg",description: "A high-quality PS controller in excellent condition, perfect for gaming enthusiasts.Moreover, it is compatible with various gaming consoles and PCs, ensuring a seamless gaming experience.",},
                ]);
            }, []);
        


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
            <Image
                src="/images/seller.png"
                alt="Seller Profile"
                width={200}
                height={200}
                className="rounded-full absolute top-44 left-10"
            />
            <div className='text-black ml-64 -mt-12 flex justify-between items-center mr-16 '>
                <div>
                    <strong className='text-xl'>Edward William</strong><br></br>
                    <b className='text-sm'>Member since 2024</b><br></br>
                    <span>+92 300123456</span><br></br>
                    <span className='text-md ml-1'>Faisalabad</span>
                    <span className='bg-[#cbb3f0] w-32 flex justify-center font-semibold'>25 items sold</span>
                </div>
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
            <div className='ml-14'>
                <ProductGrid products={currentProducts} />
                {/* page buttons */}
                    <div className="flex justify-center items-center gap-4 mt-6 text-sm m-5">
                        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}className=" disabled:opacity-50">
                            <Image
                                src="/images/prev.png" 
                                alt="Next" 
                                width={20} 
                                height={20}
                            />
                        </button>
                        <span className="text-purple-600 font-medium">{`Page ${currentPage}`}</span>
                        <button onClick={() => setPage((prev) =>Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))} disabled={currentPage === Math.ceil(products.length / productsPerPage)} className=" disabled:opacity-50">
                            <Image
                                src="/images/next.png" 
                                alt="Next" 
                                width={20} 
                                height={20}
                            />
                        </button>
                    </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default SellerProfile