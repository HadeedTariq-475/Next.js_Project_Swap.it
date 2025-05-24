import React from 'react'

function SignUpInput({type, desc}) {
  return (
    <div>
        <input 
        type={type} 
        placeholder={desc} 
        className='py-2 px-6 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#8139ed] text-black'
        />
    </div>
  )
}

export default SignUpInput