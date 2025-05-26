'use client';

import React, { useEffect, useRef, useState } from 'react';
import HomeNavBar from './components/HomeNavBar';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
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
      <section className="relative h-screen w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        
      </section>

      {/* Categories Section */}
      <section className="min-h-screen bg-white px-6 py-20 relative">
        <Image src="/images/swap,it_world.png" alt="swap.it_world" width={320} height={320} className='absolute -top-24 left-1/3 ml-8'/>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-y-12 justify-items-center text-black">
          
          <div className="col-span-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/Electronics.png" alt="Electronics" width={150} height={150}/>
            Electronics
          </div>

          <div className="col-span-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/Furniture.png" alt="Furniture" width={150} height={150}/>
            Furniture
          </div>

          <div className="col-span-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/AutoMobile.png" alt="Automobile" width={150} height={150}/>
            Automobile
          </div>

          <div className="col-span-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/Clothing.png" alt="Clothing" width={150} height={150}/>
            Clothing
          </div>

          <div className="col-span-2 col-start-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/Sports.png" alt="Sports" width={150} height={150}/>
            Sports
          </div>
         
          <div className="col-span-2 col-start-4 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/Books.png" alt="Books" width={150} height={150}/>
            Books
          </div>

          <div className="col-span-2 col-start-6 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg">
            <Image src="/images/Others.png" alt="Others" width={150} height={150}/>
            Others
          </div>        
        </div>

      </section>

      {/* Cards Section */}
      <section className="min-h-screen bg-white px-6 py-20">

      </section>

    </div>
  );
}
