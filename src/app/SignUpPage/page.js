"use client"

import React from 'react';
import SignUpInput from '/src/app/components/SignUpInput';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function SignUpPage() {
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "NORMAL"
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/SignUp_Login', formData);

      setSuccessMessage(res.data.message);

      setTimeout(() => {
          setSuccessMessage(""); // Hide message after 3 seconds
      }, 3000);

      setTimeout(() => {
        router.push("/loginPage");
      }, 3100);


    } catch (err) {

      if (err.response && err.response.data && err.response.data.error) {
        const errorMsg = err.response.data.error;

        if (errorMsg.toLowerCase().includes("email")) {
          setErrors({ email: errorMsg, password: "", general: "" });
        } else if (errorMsg.toLowerCase().includes("password")) {
          setErrors({ email: "", password: errorMsg, general: "" });
        } else {
          setErrors({ email: "", password: "", general: errorMsg });
        }
      } else {
        setErrors({ email: "", password: "", general: "Failed to connect to server" });
      }

    }
  };


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));
  };



  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex justify-between md:justify-between items-start px-4 pt-1" 
      style={{ backgroundImage: "url('/images/bg-signup.png')" }}
    >
      <div className='ml-12 mt-4'>
        {(successMessage || errors.general) && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 transition-all duration-300 
              ${successMessage ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {successMessage || errors.general}
          </div>
        )}

        <h2 className='text-3xl font-bold text-black'>Trade,Share,Swap</h2>
        <p className='text-black text-xl'>It's that simple!</p>
      </div>
      <form  onSubmit={handleSubmit}  className="w-[320px] max-w-sm md:mr-28">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black text-center">Sign Up</h1>
        <p className="mb-2 text-center text-black">Create your account in a second</p>

        <SignUpInput type="text" desc="First Name" name="firstName" value={formData.firstName} onChange={handleChange}/>
        <SignUpInput type="text" desc="Last Name" name="lastName" value={formData.lastName} onChange={handleChange}/>
        <SignUpInput type="email" desc="Email" name="email" value={formData.email} onChange={handleChange}/>
        {errors.email && <p className="text-red-500 z-10 absolute top-52 right-[460px]">{errors.email}</p>}
        <SignUpInput type="password" desc="Create Password" name="password" value={formData.password} onChange={handleChange}/>
        {errors.password && <p className="text-red-500 z-10 absolute bottom-56 right-[440px] w-72">{errors.password}</p>}

        <div className='flex justify-between items-center text-black'>
          <label >Account Type:</label>
          <div className='flex gap-x-2'>
            <label>
              <input type="radio" name="userType" value="NORMAL" checked={formData.userType ===   "NORMAL"} onChange={handleChange} className='accent-[#8139ed]'/>
              <span className='ml-1'>Normal</span>
            </label>

            <label>
              <input type="radio" name="userType" value="PREVILEGED" checked={formData.userType === "PREVILEGED"} onChange={handleChange} className='accent-[#8139ed]'/>
              <span className='ml-1'>Previleged</span>
            </label>
          </div>
        </div>


        <div className="flex items-center mt-3 mb-3">
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#8139ed]" />
          <span className="text-black text-sm ml-2">I agree to the terms and privacy policy</span>
        </div>

        <button
          type="submit"
          className="py-2 px-6 w-full rounded-md mb-3 focus:outline-none text-white bg-[#8139ed] hover:bg-[#6b2eb3]"
        >
          Create an account
        </button>

        <p className="text-black text-center text-sm">
          Already a member? <Link href="/loginPage" className="text-[#8139ed] font-medium hover:underline">Login</Link>
        </p>

        <div className="flex items-center gap-4 text-gray-600 my-3">
          <hr className="flex-grow border-black" />
          <span className="text-sm whitespace-nowrap text-black">or continue with</span>
          <hr className="flex-grow border-black" />
        </div>

        <div className="flex justify-evenly gap-10">
          <button><img src='images/google.png' className='w-10 h-10'></img></button>
          <button><img src='images/facebook.png' className='w-10 h-10'></img></button>
          <button><img src='images/instagram.png' className='w-10 h-10'></img></button>
          <button><img src='images/twitter.png' className='w-10 h-10'></img></button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
