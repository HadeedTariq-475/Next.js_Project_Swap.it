"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";


function UniversalCard({ product }) {

    const [useUrl, setUseUrl] = useState(false);
    // Determine the initial src
    const initialSrc = product.images && product.images.length > 0 
        ? (useUrl ? product.images[0].url : product.images[0]) 
        : null;

    const isDonated = product.type === "Donate";

    return (
        <div className="w-[200px] h-[290px] rounded-2xl shadow-lg bg-white overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-black flex flex-col">
            {/* Image */}
            <div className="relative w-full h-28">
                {product.images && product.images.length > 0 ? (
                    <Image
                    src={initialSrc}
                    alt={product.title}
                    fill
                    className="object-contain"
                    onError={() => {
                    // If first try failed and we haven't switched yet
                    if (!useUrl && product.images[0]?.url) {
                        setUseUrl(true);
                    }
                    }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                    </div>
                )}
            </div>
            {/* IMage details */}
            <div className="bg-purple-100 p-4 flex flex-col flex-grow justify-between overflow-hidden">
                {/* Title */}
                <h3 className="text-black font-semibold text-base">
                {product.title}
                </h3>
                <div className="text-[#8F39CE] font-bold flex items-center justify-center gap-1 text-lg">
                    <hr className="flex-grow border-[#8F39CE]" />
                    {
                        isDonated?(
                            <span className="text-sm whitespace-nowrap text-[#8F39CE] flex items-center gap-1">
                                <Image
                                src = "/images/credits.png"
                                className=""
                                width={20}
                                height={20}
                                alt="credits"/>
                                {product.credits}
                            </span>
                        ): 
                        (
                            <span className="text-sm whitespace-nowrap text-[#8F39CE] flex items-center gap-1">
                                <Image
                                    src = "/images/price-tag.png"
                                    className=""
                                    width={20}
                                    height={20}
                                    alt="price tag"
                                />
                                {product.price}$   
                            </span>
                        )
                    }
                    <hr className="flex-grow border-[#8F39CE]" />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-700 text-start overflow-hidden text-ellipsis line-clamp-2">
                    {product.description}
                </p>
                {/* Category and Credits */}
                {
                    !isDonated && (
                        <div className="flex justify-between items-center pt-2 text-sm font-medium text-purple-700">
                            <span className="pl-1">{product.exchange ? 'Exchangeable' : 'Non exchangeable'}</span>
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
                    )
                }
            </div>
        </div>
    );
}

export default UniversalCard;
