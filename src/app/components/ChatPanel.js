import React from 'react'
import Image  from 'next/image'
import Message from './Message'


export default function ChatPanel({onClose}) {


    const messages = [
  { text: "Maray pool pr jana ha\nAshir bhi jaa raha\nReady ho ja", time: "6:30", fromMe: false },
  { text: "Mein nhi jaa raha", time: "6:32", fromMe: true },
  { text: "Oye Dramay naa kr\nMein tenu kutnayii\nChuss", time: "6:30", fromMe: false },
  { text: "Mein nhi jaa raha", time: "6:32", fromMe: true },
  { text: "Nikal", time: "6:32", fromMe: true },
  ];

  return (
    <div>
        <div className='bg-white text-black w-96 h-[310px] fixed bottom-0 right-[272px] rounded-t-2xl border border-gray-300 shadow-2xl  z-50'>
          <div className='flex justify-between items-start text-black px-2 py-2'>

            <div className='flex'>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/images/dodge.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className='py-1 px-1'>
                  <p className='text-black text-xs font-semibold'>Hadeed</p>
                </div>
            </div>

            <div className='flex items-center gap-x-2 cursor-pointer'>
              <Image src={"/images/video.png"} alt="video call" width={25} height={25} />
              <Image src={"/images/phone-call.png"} alt="phone call" width={20} height={20} />
              <Image src={"/images/close.png"} alt="close" width={17} height={17} onClick={onClose}/>
            </div>

          </div>

          <div className="h-52 overflow-y-auto px-1 space-y-1 no-scrollbar">
            {messages.map((msg, idx) => (
              <Message key={idx} text={msg.text} time={msg.time} fromMe={msg.fromMe} />
            ))}
          </div>

          {/*Message Bar*/}
          <div className="flex items-center px-6">       
                <div className='relative'>
                  <input
                      type="text"
                      placeholder="Type here......"
                      className="bg-white w-80 py-1 
                      rounded-lg  border-[1px] border-black pl-4 text-black
                      focus:outline-none focus:ring-2 focus:ring-[#8139ed] ml-2 mt-2"
                  />
                  <div className='absolute top-3 right-1'>
                      <Image
                      src="/images/send-message.png"
                      alt="Search Icon"
                      width={25}
                      height={25}
                      className='rounded-full cursor-pointer'
                  /></div>
                </div>
          </div>

        </div>
    </div>
  )
}

