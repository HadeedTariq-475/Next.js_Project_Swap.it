import React from 'react';

function LoginPage() {
    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('images/loginPage.png')" }}>
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex items-center min-h-screen px-4">
                <div className="w-full max-w-[400px] lg:ml-32 md:ml-8 p-12 
                    h-[500px]           
                    lg:h-[500px]
                    bg-white/35 backdrop-blur-[16px] rounded-[20px] 
                    shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/60 text-black">
                    <h2 className="text-3xl font-bold mb-2 text-black">Login</h2>
                    <p className="mb-4 text-[#696868] text-sm">login your account in seconds</p>
                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="p-2  pl-10 text-sm rounded-[8px] bg-white opacity-85 focus:outline-none focus:ring-2 focus:ring-[#8139ed]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="p-2 pl-10 text-sm rounded-[8px] bg-white opacity-85 focus:outline-none focus:ring-2 focus:ring-[#8139ed]"
                        />
                        <div className="flex items-center justify-between text-sm mt-2">
                            <label className="flex items-center text-black">
                                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-white rounded-sm mr-2
                                    checked:bg-[#8139ed] checked:border-transparent
                                    focus:outline-none relative"
                                />
                                <span className="pointer-events-none absolute items-center justify-center text-xs hidden peer-checked:flex w-3 h-3 text-white ml-[1.25px]">
                                ✓
                                </span>
                                Keep me logged in
                            </label>
                            <a href="#" className="text-[#8139ed] hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit" className="text-sm py-2 px-4 bg-[#8139ed] text-white rounded hover:bg-[#8139ed] transition">Log in</button>
                        <p className='text-black flex justify-center text-sm'>
                            Don't have an account? <a href="#" className="text-[#8139ed] hover:underline ml-1">Sign up</a>
                        </p>
                    </form>           
                    <div className="flex items-center text-black my-6">
                        <div className="relative flex-grow h-px">
                            <div className="absolute inset-0 bg-white "></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8139ed]"></div>
                        </div>
                        <span className="mx-4 text-sm font-medium whitespace-nowrap">Or continue with</span>
                        <div className="relative flex-grow h-px">
                            <div className="absolute inset-0 bg-white "></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8139ed] to-transparent"></div>
                        </div>
                    </div>
                    <div className="flex justify-evenly gap-10">
                        <button><img src='images/google.png' className='w-10 h-10'></img></button>
                        <button><img src='images/facebook.png' className='w-10 h-10'></img></button>
                        <button><img src='images/instagram.png' className='w-10 h-10'></img></button>
                        <button><img src='images/twitter.png' className='w-10 h-10'></img></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
