import React from 'react'
import NavBar from '/src/app/components/NavBar';  
import Footer from '/src/app/components/Footer';
import Image from 'next/image';

function SellerProfile() {
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
                    <b className='text-sm'>Member since 2024</b>
                    <div className='flex py-2'>
                        <Image
                            src="/images/location.png"
                            alt="location icon"
                            height={20}
                            width={20}
                        />
                        <span className='text-md ml-1'>Faisalabad</span>
                    </div>
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
        </div>
        <Footer></Footer>
    </div>
  )
}

export default SellerProfile