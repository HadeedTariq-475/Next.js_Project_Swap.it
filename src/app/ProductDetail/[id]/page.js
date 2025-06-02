"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "/src/app/components/NavBar";
import ProductGrid  from '/src/app/components/ProductGrid';
import Footer from "/src/app/components/Footer";
import InboxPanel from "/src/app/components/InboxPanel";

function ProductDetail({}) {

    //fetching data 
    const router = useRouter()
    const { id } = useParams();
    //hooks
    const [product, setProduct] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
    //whenever new product is laoded the image index i set to 0
    useEffect(() => {
        if (product?.images?.length) {
            setSelectedIndex(0);
        }
    }, [product]);

    //fetched id and whenevr new product is fetched ie id, that ids data gets loaded
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    //fetching featured products
    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
            const res = await fetch(`/api/FeaturedProducts/`);
            const data = await res.json();
            setProducts(data);
            setCurrentIndex(0); // reset index on new load
            } catch (error) {
            console.error('Error fetching random products:', error);
            }
        };

        fetchRandomProducts();
    }, []);

    if (!product) return <div>Loading...</div>; // Handle loading


    //The wihslist button just popping up 
    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    //previous next by one logic 
    const visibleCount = 4;
    const currentProducts = products.length > 0 ? products.slice(currentIndex, currentIndex + visibleCount): [];
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
                {product.title}
            </h1>
            {/* Product detail */}
            <div className="flex flex-row justify-center items-start ">
                {/* Left div starts here */}
                    <div className="flex flex-col items-center w-[400px] mt-20 mr-14">
                        <div className="w-[300px] h-[300px] relative rounded-lg overflow-hidden ">
                            {product.images && product.images.length > 0 && (
                            <Image
                                src={product.images[selectedIndex]}
                                alt="Main Product"
                                fill
                                style={{ objectFit: "contain" }}
                                className="transition duration-300"
                            />
                            )}
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={product.images?.length ? product.images.length - 1 : 0}
                            value={selectedIndex}
                            onChange={(e) => setSelectedIndex(Number(e.target.value))}
                            className="w-24 mt-2"
                        />
                        <div className="flex gap-3 mt-2">
                            {product.images && product.images.length > 0 && product.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt="thumbnail"
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
                        {product.description}
                    </p>
                    <div className="flex items-center gap-5 text-black font-medium mb-6">
                        <Image src="/images/price-tag.png" alt="Price" width={20} height={20}/>
                        {product.type !== 'DONATE' && <span className="-ml-4">Rs.{product.price}</span>}
                         <span className={`text-xs ${product.credits === 0 ? 'text-gray-600' : 'text-black'}`}>
                            {product.credits === 0 ? 'No Credits' : `${product.credits} Credits`}
                        </span>
                        <span className={`text-xs ${!product.exchange ? 'text-gray-600' : 'text-black'}`}>
                            {product.exchange ? 'Exchange Available' : 'No Exchange'}
                        </span>
                    </div>
                    <div className="flex gap-3 mt-44 justify-center">
                        <button
                            className={`px-6 py-2 rounded-md font-semibold ${
                            product.type === 'DONATE' ? 'bg-[#ccadfa] text-white cursor-not-allowed' : 'bg-[#9C60F4] text-white'
                            }`}
                            disabled={product.type === 'DONATE'}
                        >Cash</button>
                        <button
                            className={`px-6 py-2 rounded-md font-semibold ${
                            product.exchange && product.type !== 'DONATE'
                                ? 'bg-[#9C60F4] text-white'
                                : 'bg-[#ccadfa] text-white cursor-not-allowed'
                            }`}
                            disabled={!product.exchange || product.type === 'DONATE'}
                        >
                            Exchange
                        </button>
                        <button
                            className={`px-6 py-2 rounded-md font-semibold ${
                            product.credits > 0 && product.type !== 'DONATE'
                                ? 'bg-[#9C60F4] text-white'
                                : 'bg-[#ccadfa] text-white cursor-not-allowed'
                            }`}
                            disabled={product.credits === 0 || product.type === 'DONATE'}
                        >
                            Credit
                        </button>
                    </div>
                </div>
            </div>
            {/* Seller Detail */}
            <div className="bg-[#EDE6F6] flex flex-col md:flex-row w-full max-w-[1000px] justify-start items-center mt-10 rounded-md lg:ml-36 md:ml-10 mb-14">
                <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden lg:m-2 lg:ml-6">
                    <Image
                        src={product.owner.profilePic || "/images/profile.jpg"}
                        alt={`${product.owner.firstName} ${product.owner.lastName}`}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="text-black ml-5 mr-60 w-[200px]">
                    <strong>{product.owner.firstName} {product.owner.lastName}<br></br></strong>
                    Member since {new Date(product.owner.createdAt).getFullYear()}<br />
                    <strong><Link href={`/SellerProfile/${product.owner.id}`}>View Profile</Link></strong><br></br><br></br>
                    <div className="flex justify-center p-0 bg-[#9C60F4] rounded-md text-white text-sm tracking-wider">
                        <button
                            onClick={() => 
                                {
                                if(isLoggedIn){ 
                                    OpenInbox
                                } 
                                else{
                                    router.push("/loginPage")
                                } 
                                }
                            }
                        > 
                        Negotiate Deal 
                        </button>
                        {isOpen && <InboxPanel onClose={CloseInbox}/>}
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
            <strong className="text-black ml-36 lg:text-[25px]">Your next Favorite?</strong>
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
