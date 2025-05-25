import React from 'react';
import Link from 'next/link';

function Banner({ imageSrc, pageTitle}) {
  return (
    <div className="relative w-full h-[100px] sm:h-[200px] md:h-[250px] lg:h-[280px]">
      <img src={imageSrc} alt='Banner' className="ml-5 h-full w-[1240px] " />
      <div className="absolute top-14 md:inset-10 lg:top-40 flex items-center justify-start pl-8 md:pl-8 lg:pl-20">
        <p className="text-black lg:text-2xl md:text-sm font-medium">
            <span className="opacity-80"><Link href="/">Home</Link></span> / <span className="font-bold">{pageTitle}</span>
        </p>
      </div>
    </div>
  );
}

export default Banner;
