import React from 'react'

function SignUpInput({type, desc,name,value,onChange}) {
  return (
    <div>
        <input 
        type={type} 
        name={name}
        value={value}
        placeholder={desc}
        onChange={onChange}
        required 
        className='py-2 px-6 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#8139ed] text-black'
        />
    </div>
  )
}

export default SignUpInput