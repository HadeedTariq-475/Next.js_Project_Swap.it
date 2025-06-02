"use client"
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const CATEGORY_OPTIONS = [
  { label: 'Electronics', value: 'ELECTRONICS', credits: 3 },
  { label: 'Furniture', value: 'FURNITURE', credits: 2 },
  { label: 'Automobile', value: 'AUTOMOBILE', credits: 4 },
  { label: 'Clothing & Fashion', value: 'CLOTHING_FASHION', credits: 2 },
  { label: 'Makeup & Beauty', value: 'MAKEUP_BEAUTY', credits: 1 },
  { label: 'Sports & Hobby', value: 'SPORTS_HOBBY', credits: 2 },
  { label: 'Books', value: 'BOOKS', credits: 1 },
  { label: 'Kids', value: 'KIDS', credits: 2 },
  { label: 'Property', value: 'PROPERTY', credits: 5 },
  { label: 'Mobiles', value: 'MOBILES', credits: 3 },
  { label: 'Others', value: 'OTHERS', credits: 1 },
];


export default function AddDonatedItems({onClose,onItemAdded}) {

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [userID, setUserID] = useState(null);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [noCredits, setNoCredits] = useState(false);


  const [formData, setFormData] = useState({
      title: "",
      description: "",
      price: 0,
      credits: 0,
      type: "DONATE",       
      category: "",   // e.g. "electronics", "clothing"
      exchange: false,
      status: "ACTIVE",  // you can also make this selectable
      newImageFiles: [], // store File objects before upload
    });

    useEffect(() => {
        const cookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='));
  
        if (!cookie) return; // just in case
  
        const userId = cookie.split('=')[1];
  
        setUserID(parseInt(userId))
  
      }, []);

    useEffect(() => {
      if (successMessage || errors) {
        const timer = setTimeout(() => {
          setSuccessMessage("");
          setErrors("");
        }, 4000);
        return () => clearTimeout(timer);
      }
    }, [successMessage, errors]);

    useEffect(() => {
      if (noCredits) {
        setFormData(prev => ({
          ...prev,
          credits: 0
        }));
      }
    }, [noCredits]);

    useEffect(() => {
      if (!noCredits && formData.category) {
        const selected = CATEGORY_OPTIONS.find(
          (cat) => cat.value === formData.category
        );
        if (selected) {
          setFormData((prev) => ({ ...prev, credits: selected.credits }));
        }
      }
    }, [formData.category, noCredits]);



    const uploadImages = async (productId) => {
          const uploadedUrls = [];
    
          for (const file of formData.newImageFiles) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userID}-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${productId}/${fileName}`; // Folder based on product ID
    
            const { data, error } = await supabase.storage
              .from('product-pics')
              .upload(filePath, file, { cacheControl: '3600', upsert: false });
    
            if (error) {
              setErrors(`Failed to upload image: ${file.name}`);
              return null;
            }
    
            const { data: publicUrlData } = supabase.storage
              .from('product-pics')
              .getPublicUrl(filePath);
    
            uploadedUrls.push(publicUrlData.publicUrl);
          }
    
          return uploadedUrls;
        };
        
    // Handle form submit
    const handleSave = async (e) => {
      e.preventDefault();
      
      if (images.length === 0) {
        alert("Please upload at least one image.");
        return;
      }
      // Step 1: Create product without images
      const payload = {
        ownerId: userID,
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        credits: parseInt(formData.credits),
        type: formData.type,
        category: formData.category,
        exchange: formData.exchange,
        status: formData.status,
      };

      try {
        const res = await axios.post('/api/userProducts', payload);

        if (res.data.success) {
          const productId = res.data.product.id;  // <- get the auto-increment ID
          // Step 2: Upload images using productId as folder name
          let imageUrls = [];

          if (formData.newImageFiles.length > 0) {
            const uploadedUrls = await uploadImages(productId); // Pass productId here
            if (!uploadedUrls) return;
            imageUrls = [...imageUrls, ...uploadedUrls];
          }

           // Step 3: POST image URLs + productId to save image records
          await axios.post('/api/products_images', {
            productId,
            images: imageUrls,
          });

          setSuccessMessage("Product uploaded successfully!");
          setTimeout(() => {
            onClose();
          }, 3000);
          onItemAdded();
        } else {
          setErrors(res.data.error || "Failed to upload product.");
        }
      } catch (error) {
        setErrors("Error uploading product: " + error.message);
      }
    };

     
  const handleInputChange = (e) => {
      const { name, type, value, checked } = e.target;

      // Handle description word limit
      if (name === "description") {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount > 500) return;
      }

      // If the selected field is category, set credits based on selected option
      if (name === "category") {
        const selectedCategory = CATEGORY_OPTIONS.find(
          (cat) => cat.value === value
        );
        
        setFormData((prev) => ({
          ...prev,
          category: value,
          credits: selectedCategory && !noCredits ? selectedCategory.credits : 0,
        }));
        return;
      }

      // Default case
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };


  const handleImageSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const remainingSlots = 3 - images.length;

    if (selectedFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s).`);
      return;
    }

    const imagePreviews = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...imagePreviews]);
    setFormData(prev => ({
      ...prev,
      newImageFiles: [...prev.newImageFiles, ...selectedFiles]
    }));

    event.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedFiles = [...formData.newImageFiles];

    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);

    setImages(updatedImages);
    setFormData(prev => ({
      ...prev,
      newImageFiles: updatedFiles,
    }));
  };

  const handleImageButtonClick = () => {
      if (images.length >= 3) {
        alert("You can upload a maximum of 3 images.");
        return;
      }
      fileInputRef.current.click();
    };
      


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">

      {(successMessage || errors) && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 transition-all duration-300 
              ${successMessage ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {successMessage || errors}
          </div>
        )}

      <div className="bg-white p-8 rounded-lg shadow-md w-[35vw]  h-[95vh] border-8 border-purple-300 relative">
        <Image src={"/images/close.png"} alt='close' width={15} height={15} className='absolute top-2 right-2 cursor-pointer' onClick={onClose}/>
        {/* Image Upload Section */}
        
                <div className="mb-2">
                  <div className="border-2 border-dashed border-purple-300 rounded-md p-4 w-full min-h-[160px] max-h-[160px] overflow-y-auto">
                    {/* Upload button section */}
                    {images.length < 3 && (
                      <div className="flex flex-col justify-start items-center ">
                        <Image src="/images/add-image.png" alt="add-image" height={40} width={40} />
                        <button
                          type="button"
                          onClick={handleImageButtonClick}
                          className="mt-2 bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm"
                        >
                          Upload Image
                        </button>
                      </div>
                    )}
                    
                    {/* Hidden input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
        
                    {/* Uploaded images */}
                    <div className="flex flex-wrap gap-3">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 group">
                          <Image
                            src={img.url}
                            alt={`uploaded-${idx}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-0 right-0 bg-transparent text-black rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
        

        <form onSubmit={handleSave} className="space-y-3">
          {/* Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                required
                onChange={handleInputChange}
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
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
              >
                <option value="" disabled>--Choose Category--</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.value}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
              Product Description <span className="text-red-500">*</span> <span className="text-gray-400 text-xs">max 500 words</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              rows="5"
              required
              onChange={handleInputChange}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
            ></textarea>
          </div>

          {/* checkbox */}
          <div>
            <input
              type="checkbox"
              className="w-3 h-3 accent-purple-500 text-white"
              checked={noCredits}
              onChange={() => {
                setNoCredits((prev) => {
                  const updated = !prev;
                  if (updated) {
                    setFormData((f) => ({ ...f, credits: 0 }));
                  } else {
                    // restore category-based credit
                    const selected = CATEGORY_OPTIONS.find(
                      (cat) => cat.value === formData.category
                    );
                    if (selected) {
                      setFormData((f) => ({ ...f, credits: selected.credits }));
                    }
                  }
                  return updated;
                });
              }}
            />

            <span className="text-black text-xs font-light ml-2">
              I prefer to receive no credits for this donation.
            </span>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {/* Credits Input */}
            <div>
                <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                Credits
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  name="credits"
                  value={formData.credits}
                  disabled
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
            </div>

            {/* Buttons Wrapper */}
            <div className="flex justify-end space-x-4 self-center">
                <button
                type="submit"
                className="px-3 py-1  rounded-md  text-sm font-normal text-white bg-purple-600 hover:bg-purple-700 focus:outline-none "
                >
                Upload
                </button>
                <button
                type="button"
                className="px-3 py-1  rounded-md  text-sm font-normal text-white bg-purple-600 hover:bg-purple-700 focus:outline-none "
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
