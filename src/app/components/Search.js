"use client";
import React from 'react';
import Image from 'next/image';

function Search({ placeholder = "What are you looking for?", onChange }) {
return (
    <div className="bg-[#EDE6F6] flex items-center mt-6 rounded-[10px] mx-4">
      <div className='relative'>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="bg-white w-[200px] lg:w-[280px] h-[30px] lg:h-[40px] 
          rounded-[14px] ml-4 border-[1.5px] border-black pl-6 text-black
          focus:outline-none focus:ring-2 focus:ring-[#8139ed]"
        />
        <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
          <Image
          src="/images/search-icon.png"
          alt="Search Icon"
          width={80}
          height={80}
          className='rounded-full w-6 h-6 lg:w-8 lg:h-8 cursor-pointer'
        />
        </div>
      </div>
    </div>
  );
}

export default Search;
