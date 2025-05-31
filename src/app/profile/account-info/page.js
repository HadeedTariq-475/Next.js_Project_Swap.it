import Image from 'next/image';


export default function AccountInfo() {
  
  return (
    <div>
      <h1 className="text-black text-2xl font-bold mb-6">Account Info</h1>
      <div className="flex items-center space-x-8">
        {/* Profile Image */}
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full"
        />

        {/* Upload Button */}
        <div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-xs py-2 px-3 rounded mt-16">
            Upload Image
          </button>
        </div>  
      </div>

      <div className='grid grid-cols-2 gap-x-8  gap-y-4 pt-6'>

        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-black mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-black mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Email" className="text-black mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Phone" className="text-black mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Country/State" className="text-black mb-1">
            Country/State <span className="text-red-500">*</span>
          </label>
          <select required className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black">
              <option defaultValue={"PK"}>Pakistan (PK)</option>
              <option>Dubai (UAE)</option>
              <option>United States (USA)</option>
              <option>United Kingdom (UK)</option>
          </select>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="City/Town" className="text-black mb-1">
            City/Town <span className="text-red-500">*</span>
          </label>
          <select required className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black">
              <option disabled>-- Choose City --</option>
              <option>Faisalabad</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
          </select>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="Address1" className="text-black mb-1">
            Address 1 <span className="text-gray-400">(Temporary Address)</span> <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder='House no. and street name ......'
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex col-span-2">
          <input
            type="checkbox"
            className=" px-3 py-3 border-none outline-none  text-black accent-purple-500 "
          />
          <span className='text-black ml-2'>Same as Address 1</span>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="Address2" className="text-black mb-1">
            Address 2 <span className="text-gray-400">(Permanent Address)</span> <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder='House no. and street name ......'
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

      </div>

      <div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-xs py-2 px-6 rounded mt-8">
            Save
          </button>
      </div>  
      



    </div>
  );
}
