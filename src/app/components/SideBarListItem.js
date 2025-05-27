"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarListItem({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <li
      className={`px-8 py-3 flex items-center justify-between ${
        isActive ? "text-purple-200 bg-[#9C60F4] "  : "text-black bg-purple-200" 
      }`}
    >
      <Link href={href} className="flex items-center justify-between w-full">
        <span className="text-sm">{label}</span>
        <Image
          src={isActive ? "/images/ArrowRight.png" : "/images/ArrowRight_b.png"}
          alt="Arrow"
          width={20}
          height={20}
        />
      </Link>
    </li>
  );
}
