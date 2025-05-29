import React from 'react';
import Image from 'next/image';

export default function AddDonatedItems({onClose}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">

      <div className="bg-white p-8 rounded-lg shadow-md w-[35vw]  h-[95vh] border-8 border-purple-300 relative">
        <Image src={"/images/close.png"} alt='close' width={15} height={15} className='absolute top-2 right-2 cursor-pointer' onClick={onClose}/>
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center p-8 border border-gray-300 rounded-md mb-3">
          <Image src={"/images/add-image.png"} alt='add-image' height={40} width={40}/>
          <button className="bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm">
            Upload Image
          </button>
        </div>

        <form className="space-y-3">
          {/* Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
              >
                <option disabled>Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                {/* Add more category options here */}
              </select>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
              Product Description <span className="text-red-500">*</span> <span className="text-gray-400 text-xs">&lt;1000 words</span>
            </label>
            <textarea
              name="productDescription"
              rows="5"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
            ></textarea>
          </div>

          {/* checkbox */}
          <div>
            <input type='checkbox' className='w-3 h-3 accent-purple-500 text-white'/>
            <span className='text-black text-xs font-light ml-2'>I prefer to receive no credits for this donation.</span>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credits Input */}
            <div>
                <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                Credits
                </label>
                <input
                type="number"
                min={0}
                max={5}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
                />
            </div>

            {/* Buttons Wrapper */}
            <div className="flex items-end justify-end space-x-4">
                <button
                type="submit"
                className="px-3 py-1 rounded-md text-sm font-normal text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                >
                Upload
                </button>
                <button
                type="button"
                className="px-3 py-1 rounded-md text-sm font-normal text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                >
                Preview
                </button>
            </div>
            </div>

          
        </form>
      </div>
    </div>
  )
}
