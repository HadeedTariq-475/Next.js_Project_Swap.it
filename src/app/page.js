import React from "react";
import NavBar from "./components/NavBar";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="w-full h-[1000px]"></div>
      <footer className="w-full bg-[#EDE6F6] flex items-start pt-4 pl-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          
          {/* Company Info */}
          <div className="lg:col-span-2 text-sm pr-6">
            <h2 className="text-black font-semibold text-base mb-2">
              SWAP.IT – ONE PLATFORM. INFINITE POSSIBILITIES.
            </h2>
            <div className="mb-2">
              <p className="text-gray-700 text-xs">HOTLINE 24/7</p>
              <a href="tel:041368625160" className="text-purple-600 font-semibold text-base hover:text-purple-800">(041) 3686 25 16</a>
            </div>
            <div className="text-gray-700 text-xs mb-2 leading-snug">
              <p>Office #12, 2nd Floor, TechHub Plaza,</p>
              <p>Main Boulevard, Gulberg III, Lahore, Pakistan</p>
            </div>
            <a href="mailto:contact@swapitpk.com" className="text-gray-700 text-xs hover:text-purple-600">contact@swapitpk.com </a>
            <p className="text-gray-500 text-xs mt-6">&copy 2025 All Rights Reserved | Terms of Use | SWAP.IT</p>
          </div>
        
          {/* Top Categories */}
          <div className="lg:col-span-1 text-sm">
            <h3 className="text-black font-medium text-sm mb-2">TOP CATEGORIES</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              {["Laptops", "Books", "Computers", "Cell Phones", "Clothing", "Gaming & VR", "Furniture", "Cameras", "Sports"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-600">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1 text-sm">
            <h3 className="text-black font-medium text-sm mb-2">COMPANY</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              {["About Swap.it", "Contact", "Career", "Blog", "Sitemap", "Store", "Locations"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-600">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Center */}
          <div className="lg:col-span-1 text-sm">
            <h3 className="text-black font-medium text-sm mb-2">HELP CENTER</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              {["Customer Service", "Policy", "Terms & Conditions", "Track Order", "FAQs", "My Account", "Product Support"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-600">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner */}
          <div className="lg:col-span-1 text-sm">
            <h3 className="text-black font-medium text-sm mb-2">PARTNER</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              {["Become", "Seller", "Affiliate", "Advertise", "Partnership"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-600">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
