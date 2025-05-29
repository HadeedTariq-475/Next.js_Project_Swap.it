import React from 'react';

export default function Message({ text, time, fromMe }) {
  return (
    <div className={`flex ${fromMe ? 'justify-end' : 'justify-start'} mb-1 px-2`}>
      <div
        className={`relative p-2 rounded-xl text-xs 
        ${fromMe ? 'bg-purple-500 text-white rounded-br-none' : 'bg-gray-300 text-black rounded-bl-none'}`}
        style={{ maxWidth: '85%', minWidth: '80px' }}
      >
        <p className="whitespace-pre-wrap pr-8">{text}</p>
        <span className={`text-[10px] ${fromMe ? 'text-white' : "text-gray-600"} absolute bottom-1 right-2`}>
          {time}
        </span>
      </div>
    </div>
  );
}
