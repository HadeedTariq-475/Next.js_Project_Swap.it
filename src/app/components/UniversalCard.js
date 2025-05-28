"use client";
import React from "react";
import Image from "next/image";


function UniversalCard({ product }) {

    return (
        <div
            
            className="rounded-2xl shadow-lg bg-white overflow-hidden w-[200px] cursor-pointer transition-transform hover:scale-105 hover:shadow-black flex flex-col"
        >
            {/* Image */}
            <div className="relative w-full h-28">
                <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                />
            </div>

            {/* IMage details */}
            <div className="bg-purple-100 p-4 space-y-2 text-center flex flex-grow flex-col">
                {/* Title */}
                <h3 className="text-black font-semibold text-base">
                {product.title}
                </h3>
                <div className="text-[#8F39CE] font-bold flex items-center justify-center gap-1 text-lg">
                    <hr className="flex-grow border-[#8F39CE]" />
                    <span className="text-sm whitespace-nowrap text-[#8F39CE] flex items-center gap-1">
                        <Image
                        src = "/images/price-tag.png"
                        className=""
                        width={20}
                        height={20}
                        alt="price tag"/>
                        {product.price}$   
                    </span>
                    <hr className="flex-grow border-[#8F39CE]" />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-700 text-start">
                    {product.description.length > 80
                        ? product.description.slice(0, 80) + "..."
                        : product.description}
                </p>

                {/* Category and Credits */}
                <div className="flex justify-between items-center pt-2 text-sm font-medium text-purple-700">
                    <span className="pl-1">{product.type}</span>
                    <div className="flex items-center gap-1 text-black">
                        <Image
                        src="/images/credits.png"
                        width={20}
                        height={20}
                        alt="credits"
                        />
                        {product.credits}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UniversalCard;
