import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function HomeCategoryItem({src,category,start}) {
  const router = useRouter();
  const handleClick = () => {
    // Navigate to AllCategories with category as URL param
    router.push(`/Products/AllCategories?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className={`col-span-2 text-center hover:ring-4 hover:ring-purple-400 hover:rounded-lg ${start}`}
      onClick={handleClick}
    >
        <Image src={src} alt={category} width={150} height={150}/>
        {category}
    </div>
  )
}

