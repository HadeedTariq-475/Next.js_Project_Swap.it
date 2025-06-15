"use client" 

import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../../../../lib/supabaseClient';



const cities = [
  "Karachi",
  "Lahore",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Hyderabad",
  "Gujranwala",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Jhang",
  "Kasur",
  "Gujrat",
  "Mardan",
  "Okara"
];


export default function AccountInfo() {

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [sameAddress, setSameAddress] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Pakistan",
    city: "",
    address1: "",
    address2: "",
    profilePic: "",
  });

  const [user, setUser] = useState(null);

    useEffect(() => {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('userId='));

      if (!cookie) return; // just in case

      const userId = cookie.split('=')[1];

      axios.get('/api/User', {
          params: { id: userId }
        })
        .then(res => {
          setUser(res.data);
          console.log("Fetched user:", res.data); 
        })
        .catch(err => {
          console.error('Failed to fetch user:', err);
        });
    }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.country || "Pakistan",
        city: user.city || "",
        address1: user.address1 || "",
        address2: user.address2 || "",
        profilePic: user.profilePic || "",
      }));
    }
  }, [user]);

  

  const handleSave = async () => {
    let uploadedImageUrl = formData.profilePic;

    // If user selected a new image
    if (formData.newImageFile && user?.id) {
      const file = formData.newImageFile;
      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;

      const { data, error } = await supabase.storage
        .from('profile-pics')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.log(`Image Upload Error: ${error}`);
        console.log(`Error details: ${JSON.stringify(error, null, 2)}`);
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('profile-pics')
        .getPublicUrl(fileName);

      uploadedImageUrl = publicUrlData.publicUrl;
    }

    // Prepare final formData
    const payload = {
      ...formData,
      id: user.id, // include user id
      profilePic: uploadedImageUrl,
    };

    
    // Send to your DB (use axios or fetch)
    try {
      await axios.put('/api/User', payload); // or POST depending on your setup
      setSuccessMessage("Profile updated!");
    } catch (err) {
      console.error("Saving error:", err.data);
      setErrors("Failed to save profile");
    }
  };

    // When address1 changes, if sameAddress is true, update address2 as well
  const handleAddress1Change = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      address1: value,
      address2: sameAddress ? value : prev.address2,
    }));
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    setFormData((prev) => ({
      ...prev,
      address2: checked ? prev.address1 : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent editing address2 if sameAddress is true
    if (name === "address2" && sameAddress) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file); // show preview
    setImageUrl(previewUrl); // used for display only
    setFormData(prev => ({ ...prev, newImageFile: file })); // store image for actual upload on save
  };

  
  return (
    <div>
      {(successMessage || errors) && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 transition-all duration-300 
              ${successMessage ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {successMessage || errors}
          </div>
        )}
      <h1 className="text-black text-2xl font-bold mb-6">Account Info</h1>
      <div className="flex items-center space-x-8">
        {/* Profile Image */}
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
          <Image
            src={imageUrl || formData.profilePic || "/images/profile.jpg"}
            alt="Profile"
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          id="fileInput"
        />

        {/* Upload Button */}
        <div>
          <label htmlFor="fileInput">
            <span className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white font-xs py-2 px-3 rounded mt-16 inline-block">
              Upload Image
            </span>
          </label>
        </div>

      </div>

      <div className='grid grid-cols-2 gap-x-8  gap-y-4 pt-6'>

        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-black mb-1">
            First Name 
          </label>
          <input
            type="text"
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-black mb-1">
            Last Name 
          </label>
          <input
            type="text"
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Email" className="text-black mb-1">
            Email 
          </label>
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Phone" className="text-black mb-1">
            Phone Number 
          </label>
          <input
            type="text"
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Country/State" className="text-black mb-1">
            Country/State 
          </label>
          <select disabled value="Pakistan (PK)" className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black">
              <option value="Pakistan">Pakistan</option>    
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="text-black mb-1">
            City/Town
          </label>
          <select
            name="city"
            value={formData.city || ''}
            required
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          >
            <option disabled value="">
              -- Choose City --
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="Address1" className="text-black mb-1">
            Address 1 <span className="text-gray-400">(Temporary Address)</span>
          </label> 
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleAddress1Change}
            placeholder='House no. and street name ......'
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex col-span-2">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            className=" px-3 py-3 border-none outline-none  text-black accent-purple-500 "
          />
          <span className='text-black ml-2'>Same as Address 1</span>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="Address2" className="text-black mb-1">
            Address 2 <span className="text-gray-400">(Permanent Address)</span> 
          </label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder='House no. and street name ......'
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

      </div>

      <div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-xs py-2 px-6 rounded mt-8" onClick={handleSave}>
            Save
          </button>
      </div>    
    </div>
  );
}
