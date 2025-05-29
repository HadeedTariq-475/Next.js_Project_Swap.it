"use client";
import React from "react";

const categories = [
  "All Categories",
  "Electronics",
  "Furniture",
  "AutoMobile",
  "Clothing & Fashion",
  "Makeup & Beauty",
  "Sports & Hobby",
  "Books",
  "Kids",
  "Property",
  "Mobiles",
  "Others",
];

function CategorySideBar({ selectedCategory, setSelectedCategory }) {
    return (
        <div className="w-[280px] bg-[#e3cef9] rounded-[15px]  pb-6 mt-6 ml-3 h-[450px]">
            <div className="bg-[#9C60F4] rounded-t-[15px] text-white text-center font-bold py-[6px] text-sm tracking-widest">
                CATEGORY
            </div>
            <ul className="mt-4 pl-12 pr-4 space-y-3 text-[13px]">
                {/* here we are looping over the actegories defined above */}
                {categories.map((category) => {
                    {/* Checks if the current category is selected
                        For undersatnding isSelected variable will hold true/false,
                        selected Category is the state variable that holds the currently selected category by user
                        and category is the current category being iterated over in the map function
                    */}
                    const isSelected = selectedCategory === category;
                    const isAllCategories = category === "All Categories";

                    return (
                        <li
                            // key is used by React to identify which items have changed, are added, or are removed
                            key={category}
                            // onClick event handler to set the selected category and apply that relative css

                            onClick={() => setSelectedCategory(category)}
                        
                            className={`cursor-pointer ${

                                isSelected ? "font-bold text-black" : "text-black font-normal"
                            } 
                            ${!isAllCategories ? "ml-8" : ""}`}
                        >
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CategorySideBar;