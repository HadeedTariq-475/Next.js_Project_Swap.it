"use client";
import React , {useState, useEffect } from 'react';
import Image from 'next/image';

import Banner from '/src/app/components/Banner';
import Search from '/src/app/components/Search';   
import NavBar from '/src/app/components/NavBar';  
import CategorySideBar from  '/src/app/components/CategorySideBar';
import CategoryFilterBar from '/src/app/components/CategoryFilterBar';
import ProductGrid  from '/src/app/components/ProductGrid';
import Footer from '/src/app/components/Footer';

/* SO, basically gnna tell flow cuz hehe i made it complicated(tho it was not needed)heheh
  1. Products are loaded via useEffect() and stored in products state.
  2. Filters are controlled by two states:
    - selectedCategory (from the sidebar)
    - selectedFilters (from the filter bar: type, credits, price range)
  3. A derived variable filteredProducts is computed using .filter() on products:
    - It checks that each product matches the selected category, credits, type, and price range.
  4. The filtered product list is passed into <ProductGrid /> for rendering.
*/
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
function AllCategories() {
    //Sates
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedFilters, setFilters] = useState({
      type: "Buy",
      credits: "All",
      priceMin: 0,
      priceMax: 1000000,
    });
    // For product grid
    const [products, setProducts] = useState([]);
    //For page number
    const [currentPage, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); ///////
    const productsPerPage = 4;
    const selectedCategoryKey = categoryMap[selectedCategory];
    // Functions
    function handleSearch(event) {
      console.log(event.target.value);
    }
     /*** TRIGGER FETCH ON FILTER/ CATEGORY CHANGE ***/
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const queryParams = new URLSearchParams();

          if (selectedCategory && selectedCategory !== "All Categories") {
            queryParams.append("category", categoryMap[selectedCategory]);
          }

          if (selectedFilters.type && selectedFilters.type !== "All") {
            queryParams.append("type", selectedFilters.type.toLowerCase());
          }
          if (selectedFilters.credits && selectedFilters.credits !== "All") {
            queryParams.append("credits", selectedFilters.credits);
          }
          queryParams.append("priceMin", selectedFilters.priceMin);
          queryParams.append("priceMax", selectedFilters.priceMax);

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

          // now data.products contains only current page products
          setProducts(data.products);

          // store total pages so you can disable Next button when at last page
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Fetch error:", error.message);
        }
      };

      fetchProducts();
    }, [selectedCategory, selectedFilters, currentPage]);  // fetch again if page changes

    /*  Filter logic is actually doing the heavy lifting here hehehehehe
      This function filters the products based on the selected category, credits, type, and price range, and stores the result in `filteredProducts`.
      which is later passed to the ProductGrid component for rendering. So, you gnna sse it in where i called pg component
    */
    const filteredProducts = products.filter((p) => {
      const matchCategory =
        selectedCategory === "All Categories" || p.category === selectedCategoryKey;

      const matchCredits =
        selectedFilters.credits === "All" || Number(p.credits) === Number(selectedFilters.credits);

      const matchPrice =
        p.price >= selectedFilters.priceMin && p.price <= selectedFilters.priceMax;

      return matchCategory && matchCredits && matchPrice;
    });

    //here comes the main we all were waiting for...probably not

    return (
        <div className='bg-white min-h-screen bg-cover bg-center '>
            <div className='pl-4 pr-4 pb-1 pt-1'>
                <NavBar className='p-4'></NavBar>
            </div>
            <Banner imageSrc="/images/allCategories.png" pageTitle="All Categories"></Banner>
            <Search onChange={handleSearch}></Search>
            <div className="flex pl-4 pb-6">
                <CategorySideBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className="flex-1">
                  <CategoryFilterBar filters={selectedFilters} setFilters={setFilters} />
                  <ProductGrid products={filteredProducts} />
                  {/* page buttons */}
                  <div className="flex justify-center items-center gap-4 mt-6 text-sm m-5">
                    <div className="flex justify-center items-center gap-4 mt-6 text-sm m-5">
                      <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50"
                      >
                        <Image src="/images/prev.png" alt="Prev" width={20} height={20} />
                      </button>

                      <span className="text-purple-600 font-medium">{`Page ${currentPage} of ${totalPages}`}</span>

                      <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50"
                      >
                        <Image src="/images/next.png" alt="Next" width={20} height={20} />
                      </button>
                    </div>
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

export default AllCategories;
