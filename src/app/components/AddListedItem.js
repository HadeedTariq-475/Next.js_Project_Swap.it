"use client"
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const CATEGORY_OPTIONS = [
  "ELECTRONICS",
  "FURNITURE",
  "AUTOMOBILE",
  "CLOTHING_FASHION",
  "MAKEUP_BEAUTY",
  "SPORTS_HOBBY",
  "BOOKS",
  "KIDS",
  "PROPERTY",
  "MOBILES",
  "OTHERS"
];


export default function AddListedItem({onClose,onItemAdded,editingItem = null}) {

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [userID, setUserID] = useState(null);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    credits: 0,
    type: "BUY",       
    category: "",   // e.g. "electronics", "clothing"
    exchange: false,
    status: "ACTIVE",  // you can also make this selectable
    newImageFiles: [], // store File objects before upload
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || "",
        description: editingItem.description || "",
        price: editingItem.price || 0,
        credits: editingItem.credits || 0,
        type: editingItem.type || "BUY",
        category: editingItem.category || "",
        exchange: editingItem.exchange || false,
        status: editingItem.status || "ACTIVE",
        newImageFiles: [], // you can't load existing images as files
      });

      // Show image previews (but without file objects)
      if (editingItem.images && editingItem.images.length > 0) {
        const imagePreviews = editingItem.images.map(url => ({ file: null, url }));
        setImages(imagePreviews);
      }
    }
  }, [editingItem]);


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

    const handleSave = async (e) => {
      e.preventDefault();

      if (images.length === 0) {
        alert("Please upload at least one image.");
        return;
      }

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
        let productId;

        if (editingItem) {
          // Updating an existing item
          const res = await axios.put(`/api/userProducts/${editingItem.id}`, payload);
          if (!res.data.success) {
            setErrors(res.data.error || "Failed to update product.");
            return;
          }
          productId = editingItem.id;
        } else {
          // Creating a new item
          const res = await axios.post('/api/userProducts', payload);
          if (!res.data.success) {
            setErrors(res.data.error || "Failed to upload product.");
            return;
          }
          productId = res.data.product.id;
        }

        //  Upload new images
        let newImageUrls = [];
        if (formData.newImageFiles.length > 0) {
          const uploadedUrls = await uploadImages(productId);
          if (!uploadedUrls) return;
          newImageUrls = [...uploadedUrls];

          // Store them in DB
          await axios.post('/api/products_images', {
            productId,
            images: newImageUrls,
          });
        }

        setSuccessMessage(editingItem ? "Product updated successfully!" : "Product uploaded successfully!");
        setTimeout(() => onClose(), 3000);
        onItemAdded(); 
        

      } catch (error) {
        setErrors("Error saving product: " + error.message);
      }
    };


    const handleInputChange = (e) => {
      const { name, type, value, checked } = e.target;

      if (name === "description") {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount > 500) return; // Limit to 500 words
      }

      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };




    const handleImageButtonClick = () => {
      if (images.length >= 3) {
        alert("You can upload a maximum of 3 images.");
        return;
      }
      fileInputRef.current.click();
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

  const handleRemoveImage = async (index) => {
    const imgToRemove = images[index];

    // If it's an old image (i.e., part of existing images from DB)
    if (!imgToRemove.file && editingItem) {
      try {
        await axios.delete(`/api/products_images`, {
          data: { productId: editingItem.id, imageUrl: imgToRemove.url }
        });
      } catch (err) {
        console.error("Failed to delete old image from DB", err);
      }
    }

    const updatedImages = [...images];
    updatedImages.splice(index, 1);

    // Rebuild the newImageFiles array by filtering based on the updated images
    const updatedNewFiles = updatedImages
      .filter(img => img.file) // keep only new files
      .map(img => img.file);   // get the actual File objects

    setImages(updatedImages);
    setFormData(prev => ({
      ...prev,
      newImageFiles: updatedNewFiles,
    }));
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

      <div className="bg-white py-4 px-8 rounded-lg shadow-md w-[35vw]  h-[95vh] border-8 border-purple-300 relative">
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
                required
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
              >
                <option value="" disabled>--Choose Category--</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
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

          {/* Price and Credits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name='price'
                value={formData.price}
                required
                min={0}
                onChange={handleInputChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                Credits (Optional)
              </label>
              <input
                type="number"
                name='credits'
                value={formData.credits}
                min={0}
                max={5}
                onChange={handleInputChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-black"
              />
            </div>
          </div>

          <div className='flex justify-between items-center'>
                {/* Exchangeable Checkbox */}
            <div className="flex items-center">
                <input
                id="exchange"
                name="exchange"
                type="checkbox"
                checked={formData.exchange}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded accent-purple-500"
                />
                <label htmlFor="exchange" className="ml-2 block text-sm text-gray-900">
                Exchangeable
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
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
