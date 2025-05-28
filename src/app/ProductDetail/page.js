"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "/src/app/components/NavBar";
import ProductGrid  from '/src/app/components/ProductGrid';
import Footer from "/src/app/components/Footer";

function ProductDetail() {

    //The wihslist button just popping up 
    const [isWishlisted, setIsWishlisted] = useState(false);
    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    //dummy for thumnail pics
    const imageList = [
        "/images/product-Detail.jpg",
        "/images/HomeCard_Donate.png",
    ];

    //Product Grid thingies as always
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [products, setProducts] = useState([]);
        const [history, setHistory] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);
        useEffect(() => {
            const productList = [
                { id: 1, title: "VR Headset", image: "/images/p1dummy.jpg",  description: "Fully functional with no scratches or defects. Ideal for immersive gaming ....." },
                { id: 5, title: "VR Headset", image: "/images/p1dummy.jpg",  description: "Fully functional with no scratches or defects. Ideal for immersive gaming ....." },
                { id: 2, title: "Dual Side Controller", image: "/images/p2dummy.jpg" ,description: "Fully functional with no scratches or defects. Ideal for immersive gaming ....." },
                { id: 3, title: "PS-Controller", image: "/images/p3dummy.jpg",  description: "Fully functional with no scratches or defects. Ideal for immersive gaming ....." },
                { id: 4, title: "Another Product", image: "/images/p2dummy.jpg",  description: "Fully functional with no scratches or defects. Ideal for immersive gaming ....." },
                { id: 6, title: "VR Headset", image: "/images/p1dummy.jpg",  description: "Fully functional with no scratches or defects. Ideal for immersive gaming ....." },
                // Add more if needed
            ];
            setProducts(productList);
            setHistory([0]); // start with the first product
        }, []);
            //previous next by one logic 
            const visibleCount = 4;
            const currentProducts = products.length > 0
            ? products.slice(currentIndex, currentIndex + visibleCount)
            : [];
            const nextProduct = () => {
                setCurrentIndex((prevIndex) => {
                    if (prevIndex + visibleCount >= products.length) return prevIndex; // already at end
                    return prevIndex + 1; // move one step forward
                });
            };
            const prevProduct = () => {
                    setCurrentIndex((prevIndex) => {
                    if (prevIndex <= 0) return 0; // already at start
                    return prevIndex - 1; // move one step back
                });
            };


       
    //main as obvious
    return (
        <div className="relative bg-white min-h-screen bg-cover bg-center py-2">
            <NavBar />
            <h1 className="absolute top-24 left-1/2 transform -translate-x-1/2 text-3xl font-light z-30 text-black">
                Play Station 5
            </h1>
            {/* Product detail */}
            <div className="flex flex-row justify-center items-start ">
                {/* Left div starts here */}
                    <div className="flex flex-col items-center w-[400px] mt-20 mr-14">
                        <div className="w-[300px] h-[300px] relative rounded-lg overflow-hidden ">
                            <Image
                                src={imageList[selectedIndex]}
                                alt="Main Product"
                                fill
                                style={{ objectFit: "contain" }}
                                className="transition duration-300"
                            />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={imageList.length - 1}
                            value={selectedIndex}
                            onChange={(e) => setSelectedIndex(Number(e.target.value))}
                            className="w-24 mt-2"
                        />
                    
                        <div className="flex gap-3 mt-2">
                            {imageList.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                width={80}
                                height={80}
                                onClick={() => setSelectedIndex(index)}
                                className={`rounded-lg object-cover border cursor-pointer transition duration-200 ${
                                selectedIndex === index ? "ring-2 ring-[#9C60F4]" : ""
                                }`}
                            />
                            ))}
                        </div>
                    </div>
                {/* left div ends here */}
                <div className="bg-[#EDE6F6] p-6 rounded-3xl rounded-bl-none w-[400px] h-[500px] relative">
                    <div className="absolute left-0 top-1/4 h-[375px] w-1 bg-[#706f6f]"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div></div>
                        <div
                            className="text-sm text-[#696868] flex items-center gap-1 cursor-pointer"
                            onClick={toggleWishlist}
                            >
                            <span>{isWishlisted ? "Added to wishlist" : "Add to wish List"}</span>
                            <Image
                                src={isWishlisted ? "/images/wishlist-p.png" : "/images/wishlist.png"}
                                alt="Wishlist"
                                width={30}
                                height={30}
                                className="transition transform duration-300 ease-out active:scale-125"
                            />
                        </div>
                    </div>
                    <p className="text-black mb-4 mt-16">
                        Lightly used PS5 in excellent condition. Fully functional, includes original DualSense controller and cables. No scratches, runs smoothly. Great for 4K gaming.
                    </p>
                    <div className="flex items-center gap-5 text-black font-medium mb-6">
                        <Image src="/images/price-tag.png" alt="Price" width={20} height={20} />
                        <span>$450</span>
                        <span className="text-xs text-gray-600">No Credits</span>
                        <span className="text-xs text-gray-600">No exchange</span>
                    </div>
                    <div className="flex gap-3 mt-44 justify-center">
                        <button className="bg-[#9C60F4] text-white px-6 py-2 rounded-md font-semibold">Cash</button>
                        <button className="bg-[#ccadfa] text-white px-6 py-2 rounded-md font-semibold cursor-not-allowed">
                            Exchange
                        </button>
                        <button className="bg-[#ccadfa] text-white px-6 py-2 rounded-md font-semibold cursor-not-allowed">
                            Credit
                        </button>
                    </div>
                </div>
            </div>
            {/* Seller Detail */}
            <div className="bg-[#EDE6F6] flex w-[1000px] justify-start items-center mt-10 rounded-md ml-36">
                <Image
                        src="/images/seller.png"
                        alt="Seller"
                        width={180}
                        height={180}
                        className="rounded-full m-2 ml-6"
                />
                <div className="text-black ml-5 mr-60 w-[200px]">
                    <strong>Edward William<br></br></strong>
                    Member since 2024<br></br>
                    <strong><Link href={""}>View Profile</Link></strong><br></br><br></br>
                    <div className="flex justify-center p-0 bg-[#9C60F4] rounded-md text-white text-sm tracking-wider">
                        <button> 
                            Negotiate Deal 
                        </button>
                        <Image
                            src="/images/message-icon.png"
                            alt="Seller"
                            width={15}
                            height={15}
                            className=" m-2"
                        />
                    </div>
                </div>
                <div className=" w-[400px] h-[170px] flex justify-center items-center relative m-2 ">
                    <Image
                        src="/images/sellerCard.png"
                        alt="Seller"
                        fill
                        className="object-cover rounded-tr-md rounded-br-md "
                    />
                </div>
            </div>
            {/* Featured products */}
            <div className="ml-32 mt-12 mb-12 flex">
                <button onClick={prevProduct} disabled={currentIndex <= 0} className="p-4">
                    <Image src="/images/prev.png" alt="Prev" width={20} height={20}/>
                </button>
                <ProductGrid products={currentProducts} />
                <button onClick={nextProduct} disabled={currentIndex + visibleCount >= products.length} className="ml-12">
                    <Image src="/images/next.png" alt="Next" width={20} height={20} />
                </button>
            </div>
            {/*Footer */}
            <Footer></Footer>
        </div>
    );
}

export default ProductDetail;
