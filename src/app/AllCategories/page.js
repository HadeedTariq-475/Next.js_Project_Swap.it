"use client";
import React , {useState} from 'react';
import Search from '/src/app/components/Search';   
import Banner from '/src/app/components/Banner';
import NavBar from '/src/app/components/NavBar';  
import CategorySideBar from  '/src/app/components/CategorySideBar';

function AllCategories() {
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    function handleSearch(event) {
        console.log(event.target.value);
    }
    return (
        <div className='bg-white min-h-screen bg-cover bg-center '>
            <div className='pl-4 pr-4 pb-1 pt-1'>
                <NavBar className='p-4'></NavBar>
            </div>
            <Banner imageSrc="/images/allCategories.png" pageTitle="All Categories"></Banner>
            <Search onChange={handleSearch}></Search>
            <CategorySideBar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} >

            </CategorySideBar>
        </div>
    );
}

export default AllCategories;
