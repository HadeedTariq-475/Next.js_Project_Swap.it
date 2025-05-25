"use client";
import React from 'react';

function Search({ placeholder = "What are you looking for?", onChange }) {
  return (
    <div className="bg-[#EDE6F6] flex items-center ml-5 
      mt-6 w-full max-w-[1240px] h-[40px] lg:h-[50px] rounded-[10px]">
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="bg-white w-[300px] lg:w-[400px] h-[35px] lg:h-[50px] 
        rounded-[10px] ml-6 border-2 border-black pl-10 text-black
        focus:outline-none focus:ring-2 focus:ring-[#8139ed]"
      />
    </div>
  );
}

export default Search;
