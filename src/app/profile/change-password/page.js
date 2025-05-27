import React from 'react';

export default function ChangePassword() {
  return (
    <div>
      <h1 className="text-black text-2xl font-bold mb-16">Change Password</h1>

      <div className="space-y-6 w-1/2">
        {/* Old Password */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label htmlFor="old-password" className="text-black ">
            Old Password <span className="text-red-500">*</span>
          </label>
          <input
            id="old-password"
            type="password"
            required
            className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        {/* New Password */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label htmlFor="new-password" className="text-black ">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            id="new-password"
            type="password"
            required
            className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        {/* Confirm Password */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label htmlFor="confirm-password" className="text-black">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <p className='text-purple-500 text-end hover:text-purple-600 hover:underline'>Forgot Password?</p>

        <button className='text-white bg-purple-500 px-4 py-3 rounded-lg'>Change Password</button>
      </div>
    </div>
  );
}
