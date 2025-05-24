import React from 'react';
import SignUpInput from '/src/app/components/SignUpInput';
import Link from 'next/link';

function SignUpPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat  flex justify-center md:justify-end items-center px-4"
      style={{ backgroundImage: "url('/images/bg-signup.png')" }}
    >
      <form className="w-full max-w-sm md:mr-28">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black text-center">Sign Up</h1>
        <p className="mb-4 text-center text-black">Create your account in a second</p>

        <SignUpInput type="text" desc="First Name" />
        <SignUpInput type="text" desc="Last Name" />
        <SignUpInput type="email" desc="Email" />
        <SignUpInput type="password" desc="Create Password" />

        <div className="flex items-center mt-2 mb-4">
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#8139ed]" />
          <span className="text-black text-sm ml-2">I agree to the terms and privacy policy</span>
        </div>

        <button
          type="submit"
          className="py-2 px-6 w-full rounded-md mb-4 focus:outline-none text-white bg-[#8139ed] hover:bg-[#6b2eb3]"
        >
          Create an account
        </button>

        <p className="text-black text-center text-sm">
          Already a member? <Link href="/loginPage" className="text-[#8139ed] font-medium hover:underline">Login</Link>
        </p>

        <div className="flex items-center gap-4 text-gray-600 my-4">
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
