"use client";
import React , {useState} from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

import Banner from '/src/app/components/Banner';
import Search from '/src/app/components/Search';   
import NavBar from '/src/app/components/NavBar';  
import CategorySideBar from  '/src/app/components/CategorySideBar';
import CategoryFilterBar from '/src/app/components/CategoryFilterBar';
import ProductGrid  from '/src/app/components/ProductGrid';
import Footer from '/src/app/components/Footer';

function Donations() {

    // Function to handle search input changes
    function handleSearch(event) {
        console.log(event.target.value);
    }

    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const [selectedFilters, setFilters] = useState({
        type: "Donate",
        credits: "All",
    });


    // For product grid
    const [products, setProducts] = useState([]);

    //For page number
    const [currentPage, setPage] = useState(1);
    const productsPerPage = 9;


    // Fake data load for checking the UI
    useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Virtual Reality Headset",
        credits: 2,
        price: 1500,
        type: "Buy",
        category: "Electronics",
        image: "/images/p1dummy.jpg",
        description: "Experience immersive gaming with this high-quality VR headset.",
      },
      {
        id: 2,
        title: "Dual Side Conroller",
        credits: 1,
        price: 500,
        type: "Donate",
        category: "Kids",
        image: "/images/p2dummy.jpg",
        description: "Fully functional with no scratches or defects. Ideal for immersive gaming .....",
      },
      {
        id: 3,
        title: "PS-Controller",
        credits: 0,
        price: 500,
        type: "Exchange",
        category: "Others",
        image: "/images/p3dummy.jpg",
        description: "A high-quality PS controller in excellent condition, perfect for gaming enthusiasts.Moreover, it is compatible with various gaming consoles and PCs, ensuring a seamless gaming experience.",
      },
       {
        id: 4,
        title: "PS-Controller",
        credits: 0,
        price: 500,
        type: "Donate",
        category: "Others",
        image: "/images/p3dummy.jpg",
        description: "A high-quality PS controller in excellent condition, perfect for gaming enthusiasts.Moreover, it is compatible with various gaming consoles and PCs, ensuring a seamless gaming experience.",
      },
    ]);
  }, []);
  

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;

    const matchCredits =
      selectedFilters.credits === "All" || Number(p.credits) === Number(selectedFilters.credits);

    const matchType = 
    p.type === selectedFilters.type;


    return matchCategory && matchCredits && matchType;
  });

  //
    const lastPageIndex = currentPage * productsPerPage;
    const firstPageIndex = lastPageIndex - productsPerPage;
    const currentProducts = filteredProducts.slice(firstPageIndex, lastPageIndex);

    //here comes the main we all were waiting for...probably not

    return (
        <div className='bg-white min-h-screen bg-cover bg-center '>
            <div className='pl-4 pr-4 pb-1 pt-1'>
                <NavBar className='p-4'></NavBar>
            </div>
            <Banner imageSrc="/images/donations.png" pageTitle="Donations"></Banner>
            <Search onChange={handleSearch}></Search>
            <div className="flex pl-4 pb-6">
                <CategorySideBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className="flex-1">
                  <CategoryFilterBar filters={selectedFilters} setFilters={setFilters} showType={false} showPrice={false} />
                  <ProductGrid products={currentProducts} />
                  {/* page buttons */}
                  <div className="flex justify-center items-center gap-4 mt-6 text-sm m-5">
                    <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className=" disabled:opacity-50"
                    >
                      <Image
                        src="/images/prev.png" 
                        alt="Next" 
                        width={20} 
                        height={20}
                      />
                    </button>

                    <span className="text-purple-600 font-medium">{`Page ${currentPage}`}</span>

                    <button
                      onClick={() => setPage((prev) =>
                        Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage))
                      )}
                      disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                      className=" disabled:opacity-50"
                    >
                      <Image
                        src="/images/next.png" 
                        alt="Next" 
                        width={20} 
                        height={20}
                      />
                    </button>
                  </div>
                </div>
            </div>
            <div className='bg-[#EDE6F6]'>
                <div className='ml-6'>
                <Footer></Footer>
              </div>
            </div>
        </div>
    );
}

export default Donations;
