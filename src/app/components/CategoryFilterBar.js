"use client";
import React from "react";

export default function CategoryFilterBar({ filters, setFilters }) {
    return (
        <div className="flex flex-wrap gap-10 mb-6 mt-5 justify-between text-[13px] font-bold text-black px-4">
            {/* Type */}
            <div className="flex gap-8">
            <div className="flex flex-col">
                <label className="mb-1">
                Type <span className="text-red-500">*</span>
                </label>
                <select
                    className="border border-gray-500 rounded-md px-3 py-1 focus:outline-none font-medium"
                    // This binds the selected value of the <select> dropdown to the current value stored in the filters.type part of the state.
                    value={filters.type}
                    //...filters spreads the existing filters object, and then type is updated with the new value from the dropdown.
                    onChange={(event) => setFilters({ ...filters, type: event.target.value })}
                >
                    <option>All</option>
                    <option>Buy</option>
                    <option>Exchange</option>
                    <option>Donate</option>
                </select>
            </div>

            {/* Credits */}
            <div className="flex flex-col">
                <label className="mb-1">Credits</label>
                <select max={5} min={0}
                className="border border-gray-500 rounded-md px-3 py-1 focus:outline-none w-[110px] font-mediums"
                value={filters.credits}
                onChange={(e) => setFilters({ ...filters, credits: e.target.value })}
                >
                    <option>All</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            </div>
            {/* Price Range */}
            <div className="flex flex-col">
                <label className="mb-1">Price</label>
                <div className="flex items-center gap-2">
                <span className="text-gray-600">from</span>
                <input
                    type="number"
                    className="border border-gray-500 rounded-md w-20 px-2 py-1 focus:outline-none font-medium"
                    value={filters.priceMin}
                    // This binds the value of the input field to the current value stored in the filters.priceMin part of the state.
                    onChange={(event) => setFilters({ ...filters, priceMin: event.target.value })}
                />
                <span className="text-gray-600">to</span>
                <input
                    type="number" max={10000} min={0}
                    className="border border-gray-500 rounded-md w-24 px-2 py-1 focus:outline-none font-medium"
                    // This binds the value of the input field to the current value stored in the filters.priceMax part of the state.
                    value={filters.priceMax}
                    onChange={(event) => setFilters({ ...filters, priceMax: event.target.value })}
                />
                </div>
            </div>
        </div>
    );
}
