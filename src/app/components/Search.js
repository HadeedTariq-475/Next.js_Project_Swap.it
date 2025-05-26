"use client";
import React from 'react';
import Image from 'next/image';

function Search({ placeholder = "What are you looking for?", onChange }) {
return (
    <div className="bg-[#EDE6F6] flex items-center ml-3 
      mt-6 w-full max-w-[1240px] h-[40px] lg:h-[50px] rounded-[10px]">
      <div className='relative'>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="bg-white w-[230px] lg:w-[260px] h-[35px] lg:h-[50px] 
          rounded-[14px] ml-6 border-[1.5px] border-black pl-6 text-black
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
