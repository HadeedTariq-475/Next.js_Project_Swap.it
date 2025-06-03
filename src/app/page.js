'use client';

import React, { useEffect, useRef, useState } from 'react';
import HomeNavBar from './components/HomeNavBar';
import HomeCard from './components/HomeCard';
import AboutUsSections from './components/AboutUsSections';
import Footer from './components/Footer';
import HomeCategoryItem from './components/HomeCategoryItem'; 
import Image from 'next/image';
import Link from 'next/link';


export default function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Read cookies from the browser
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('userId='));
    
    if (cookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const videoSources = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % videoSources.length);
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set new src and play
    video.src = videoSources[currentIndex];
    video.load();
    video
      .play()
      .catch((e) => console.warn('Autoplay may be blocked by browser:', e));
  }, [currentIndex]);

  return (
    <div>

      <HomeNavBar />

      {/* Video background section */}
      <section id="Home" className="relative h-screen w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        /> 

        {/*Search Bar */}
        <div className="flex items-center absolute right-14 bottom-20">
          <div className='relative'>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-white w-96 h-11 rounded-xl  pl-6 text-black focus:outline-none focus:ring-2 focus:ring-[#8139ed]"
            />
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
              <Image
                src="/images/search-icon.png"
                alt="Search Icon"
                width={80}
                height={80}
                className='rounded-full w-5 h-5 lg:w-8 lg:h-8 cursor-pointer'
              />
            </div>
          </div>
        </div>

        {/*Login & SignUp Buttons */}
        {!isLoggedIn && 
        (<div className='flex justify-between items-center gap-3 absolute bottom-8 left-14'>
          <Link href={"/loginPage"}>
            <button className='bg-white text-purple-500 px-4 py-2 rounded-lg'>
              Login
            </button>
          </Link>
          <Link href={"/SignUpPage"}>
            <button className='bg-purple-500 text-white px-4 py-2 rounded-lg'>
              Sign Up
            </button>
          </Link> 
        </div>)}

      </section>

      

      {/* Categories Section */}
      <section className="min-h-screen bg-white px-6 py-20 relative">

        <Image src="/images/swap,it_world.png" alt="swap.it_world" width={320} height={320} className='absolute -top-24 left-1/3 ml-8'/>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-y-12 justify-items-center text-black">
          
          <HomeCategoryItem src={"/images/Electronics.png"} category={"Electronics"} />
          <HomeCategoryItem src={"/images/Furniture.png"} category={"Furniture"} />
          <HomeCategoryItem src={"/images/AutoMobile.png"} category={"AutoMobile"}/>
          <HomeCategoryItem src={"/images/Clothing.png"} category={"Clothing_Fashion"}/>
          <HomeCategoryItem src={"/images/Sports.png"} category={"Sports_Hobby"} start={"col-start-2"}/>
          <HomeCategoryItem src={"/images/Books.png"} category={"Books"} start={"col-start-4"}/>
          <HomeCategoryItem src={"/images/Others.png"} category={"Others"} start={"col-start-6"}/>
       
        </div>
      </section>

      {/* Cards Section */}
      <section className=" bg-white py-2 relative pb-56">
        <div className="bg-[#9C60F4] w-full h-64 mt-4"></div>
        <div className='flex flex-col md:flex-row gap-4 md:gap-4 justify-evenly items-center absolute z-20 top-12 left-28 right-28'>
          <HomeCard src={"/images/HomeCard_Buy.png"} title={"BUY NOW"} desc={"Why pay full price? Score top items without paying top prices."} label={"Buy"}/>
          <HomeCard src={"/images/HomeCard_Exchange.png"} title={"EXCHANGE NOW"} desc={"Tired of spending? Trade what you have for what you need."} label={"Exchange"}/>
          <HomeCard src={"/images/HomeCard_Donate.png"} title={"DONATE NOW"} desc={"Give items a second life. Your small gift can mean the world to someone."} label={"Donate"}/>
        </div>
      </section>

      {/* About Section */}
      <section id="About" className=" bg-white py-2 relative pb-28">
        <div className='w-full h-80 bg-bottom bg-cover' style={{backgroundImage: 'url("/images/AboutUs.png")'}}>
           <h1 className='text-black text-center font-bold text-3xl mb-1 pt-6'>About Us</h1>
           <p className='text-gray-500 text-center'>Real Deals. Real Fast.</p>
          <div className='flex justify-evenly items-center px-20 py-6 gap-20 ml-6 '>
            <AboutUsSections src={"/images/Support.png"} title={"24/7 Support"} desc={"answers to any business related inquiry 24/7 and in real-time."}/>
            <AboutUsSections src={"/images/Large_Assortment.png"} title={"Large Assortment"} desc={"we offer many different types of products with fewer variations in each category."}/>
            <AboutUsSections src={"/images/global_trading.png"} title={"Global Trading, Seamless Connections"} desc={"Connecting people worldwide to exchange goods. Fast, easy and reliable."}/>
          </div>
        </div>      
      </section>


      {/*Contact Section */}
     <section id="Contact" className="px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 flex flex-col lg:flex-row max-w-screen-xl mx-auto gap-8 ">
          
          {/* Left Form Side */}
          <div className="flex-1 px-16">
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">READY TO WORK WITH US</h2>
              <p className="text-gray-600 text-sm md:text-sm">Contact us for all your questions and opinions</p>
            </div>

            <form className="space-y-3 text-xs md:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block font-normal text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-normal text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block normal text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-normal text-gray-700 mb-1">
                  Phone Number <span className="text-gray-500">(Optional)</span>
                </label>
                <input 
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="country" className="block font-normal text-gray-700 mb-1">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select 
                  id="country"
                  name="country"
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-black"
                >
                  <option value="Pakistan (PK)">Pakistan (PK)</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block font-normal text-gray-700 mb-1">
                  Subject <span className="text-gray-500">(Optional)</span>
                </label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-normal text-gray-700 mb-1">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-black"
                  placeholder="Note about your experience, e.g. suggestions"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pb-8">
                <input 
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="mt-1 h-3 w-3 text-purple-600 focus:ring-purple-500 accent-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="text-gray-700 text-sm">
                  I want to receive news and updates. By submitting, I agree to the
                  <a href="#" className="text-purple-600 hover:text-purple-700 underline ml-1">Terms & Conditions</a>
                </label>
              </div>

              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Contact Info Side */}
          <div className=" space-y-4 px-12">
            <div className="bg-purple-100 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">PAKISTAN (HEADQUARTER)</h3>
                <div className="text-gray-700 text-sm space-y-1">
                  <p>Office #12, 2nd Floor, TechHub Plaza,</p>
                  <p>Main Boulevard, Gulberg III, Lahore, Pakistan</p>
                  <p className="font-medium">+92 300 1234567</p>
                  <a href="mailto:info@swapitpk.com" className="text-purple-600 hover:text-purple-700 underline">info@swapitpk.com</a>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">DUBAI (BRANCH)</h3>
                <div className="text-gray-700 text-sm space-y-1">
                  <p>Office 210, Innovation Hub, Dubai Silicon Oasis,</p>
                  <p>Dubai, United Arab Emirates</p>
                  <p className="font-medium">+971 50 123 4567</p>
                  <a href="mailto:info@swapitdubai.com" className="text-purple-600 hover:text-purple-700 underline">info@swapitdubai.com</a>
                </div>
              </div>

              <div className="flex gap-3">
                <Image src="/images/contact_facebook.png" alt="facebook logo" width={24} height={24} />
                <Image src="/images/contact_insta.png" alt="instagram logo" width={24} height={24} />
                <Image src="/images/contact_twitter.png" alt="twitter logo" width={24} height={24} />
              </div>
            </div>

            <div>
              <Image src="/images/contact-form-img.png" alt="contact-form-img" width={400} height={400} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section*/}
      <section>
        <Footer />
      </section>
    </div>    
  );
}
