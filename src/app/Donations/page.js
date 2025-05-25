"use client";
import React from 'react';
import Search from '/src/app/components/Search';   
import Banner from '/src/app/components/Banner';

function AllCategories() {
    function handleSearch(event) {
        console.log(event.target.value);
    }
    return (
        <div className='bg-white min-h-screen bg-cover bg-center'>
            <Banner imageSrc="/images/donations.png" pageTitle="Donations"></Banner>
            <Search onChange={handleSearch}></Search>
        </div>
    );
}

export default AllCategories;
