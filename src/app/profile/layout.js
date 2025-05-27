"use client"

import { Geist, Geist_Mono, Jost } from "next/font/google";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { usePathname } from "next/navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});



export default function ProfileLayout({ children }) {

    const pathname = usePathname()

    return (
        <div
        className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} antialiased bg-white`}
        >
            <NavBar />
            <div className="bg-[#EDE6F6] mx-3 mt-2 h-10 rounded-[10px] text-black text-sm font-semibold flex items-center pl-4">
              {pathname}
            </div>
            <div className="flex min-h-screen mt-3">
                <SideBar />
                <main className="flex-1 px-6 py-4 mb-6">{children}</main>
            </div>
            <Footer />
        </div>
    );
}
