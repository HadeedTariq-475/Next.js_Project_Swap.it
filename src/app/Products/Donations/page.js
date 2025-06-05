"use client";
import React , {useState, useEffect} from 'react';
import Image from 'next/image';

import Banner from '/src/app/components/Banner';
import Search from '/src/app/components/Search';   
import NavBar from '/src/app/components/NavBar';  
import CategorySideBar from  '/src/app/components/CategorySideBar';
import CategoryFilterBar from '/src/app/components/CategoryFilterBar';
import ProductGrid  from '/src/app/components/ProductGrid';
import Footer from '/src/app/components/Footer';

const categoryMap = {
    "All Categories": null, 
    "Electronics": "ELECTRONICS",
    "Furniture": "FURNITURE",
    "AutoMobile": "AUTOMOBILE",
    "Clothing & Fashion": "CLOTHING_FASHION",
    "Makeup & Beauty": "MAKEUP_BEAUTY",
    "Sports & Hobby": "SPORTS_HOBBY",
    "Books": "BOOKS",
    "Kids": "KIDS",
    "Property": "PROPERTY",
    "Mobiles": "MOBILES",
    "Others": "OTHERS",
};

function Donations() {
    //---------------------------STATES----------------------------//
    // Function to handle search input changes
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedFilters, setFilters] = useState({
        type: "Donate",
        credits: "All",
    });
    const [searchQuery, setSearchQuery] = useState("");              //searchbar
    const [isSearching, setIsSearching] = useState(false);          //searchbar
    const [products, setProducts] = useState([]);                  // For product grid
    const [currentPage, setPage] = useState(1);                   //Setting Pages
    const [totalPages, setTotalPages] = useState(1); 

    const productsPerPage = 16;

    //---------------------------FUNCTIONS----------------------------//
    
    //(Search submission Function (called on search button or erased)
    async function handleSearch() {
      if (!searchQuery.trim()) {
        setIsSearching(false);
        setPage(1);
        return; // no search query, do normal loading
      }

      setIsSearching(true);
      setPage(1); // reset page to 1

      const queryParams = new URLSearchParams();
      queryParams.append("type", "Donate");
      queryParams.append("search", searchQuery);
      queryParams.append("page", 1);
      queryParams.append("limit", 1000); // large limit or some max for search results

      const res = await fetch(`/api/products?${queryParams}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    }
    
    //(Normal page revival Function)ie. after seacrh you want normal thingies page
    async function fetchNormalProducts() {
      const queryParams = new URLSearchParams();

      if (selectedCategory && selectedCategory !== "All Categories") {
        queryParams.append("category", categoryMap[selectedCategory]);
      }
      if (selectedFilters.credits && selectedFilters.credits !== "All") {
        queryParams.append("credits", selectedFilters.credits);
      }
      queryParams.append("type", "Donate");
      queryParams.append("page", currentPage);
      queryParams.append("limit", productsPerPage);
      const res = await fetch(`/api/products?${queryParams.toString()}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    }
    //---------------------------EFFECTS----------------------------//
        
        //(Effect: Handle search query changes (with debounce and reset))
        useEffect(() => {
          if (!searchQuery.trim()) {
            setIsSearching(false);
            setPage(1);
            fetchNormalProducts();
            return;
          }
          setIsSearching(true);
          setPage(1);
          const delayDebounce = setTimeout(() => {
            handleSearch();
          }, 300);
          return () => clearTimeout(delayDebounce);
        }, [searchQuery]);
    
         //(TRIGGER FETCH ON FILTER/ CATEGORY CHANGE)//
        useEffect(() => {
          if (isSearching) return;
          const fetchProducts = async () => {
            try {
              const queryParams = new URLSearchParams();
    
              if (selectedCategory && selectedCategory !== "All Categories") {
                queryParams.append("category", categoryMap[selectedCategory]);
              }
              if (selectedFilters.credits && selectedFilters.credits !== "All") {
                queryParams.append("credits", selectedFilters.credits);
              }
              queryParams.append("type", "Donate");
              queryParams.append("page", currentPage);
              queryParams.append("limit", productsPerPage);
    
              const url = `/api/products?${queryParams.toString()}`;
    
              const res = await fetch(url);
              if (!res.ok) {
                const error = await res.json();
                console.error("API error:", error);
                return;
              }
              const data = await res.json();
    
              if (data.products.length === 0 && currentPage !== 1) {
                setPage(1);
              } else {
                setProducts(data.products);
                setTotalPages(data.totalPages);
              }
            } catch (error) {
              console.error("Fetch error:", error.message);
            }
          };
    
          fetchProducts();
        }, [selectedCategory, selectedFilters, currentPage]);  // fetch again if page changes
    //---------------------------EFFECTS ENd----------------------------//
  const filteredProducts = products.filter((p) => {
    const matchTitle = isSearching ? true: p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTitle;
  });
    //here comes the main we all were waiting for...probably not

    return (
        <div className='bg-white min-h-screen bg-cover bg-center '>
            <div className='pl-4 pr-4 pb-1 pt-1'>
                <NavBar className='p-4'></NavBar>
            </div>
            <Banner imageSrc="/images/donations.png" pageTitle="Donations"></Banner>
            <Search 
              onChange={(e) => setSearchQuery(e.target.value)} 
              onSearch={handleSearch} 
            />
            <div className="flex pl-4 pb-6">
                <CategorySideBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className="flex-1">
                  <CategoryFilterBar filters={selectedFilters} setFilters={setFilters} showType={false} showPrice={false} />
                  <div style={{ minHeight: '350px' }}>
                    <ProductGrid products={products} />
                    {products.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No related products found.</p>
                    )}
                  </div>
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
