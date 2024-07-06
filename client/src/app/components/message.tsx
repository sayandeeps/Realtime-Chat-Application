// components/Message.tsx

import React from 'react';

interface MessageProps {
  sender?: boolean; // Optional boolean to differentiate sender and receiver styles
  name: string;
  time: string;
  message: string;
  status?: string; // Optional status such as "Delivered" or "Read"
  avatarSrc: string;
}

const Message: React.FC<MessageProps> = ({
  sender = false,
  name,
  time,
  message,
  avatarSrc,
}) => {
  return (
    <div className={`flex items-start gap-2.5 mb-2 ${sender ? 'justify-end' : 'justify-start rtl'}`}>
      { !sender && <img className="w-8 h-8 rounded-full" src={avatarSrc} alt={name + ' image'} />}
      <div className={`flex flex-col w-full max-w-[320px] leading-5 p-4 border-gray-200 ${sender ? 'bg-indigo-500 hover:bg-indigo-600 rounded-es-xl' : 'bg-gray-100 hover:bg-gray-200 rounded-e-xl'}`}>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-semibold ${sender ? 'text-white' : 'text-gray-900'}`}>{name}</span>
          <span className={`text-sm font-normal text-gray-500 ${sender ? 'text-white' : 'text-gray-500'}`}>{time}</span>
        </div>
        <p className={`text-sm font-normal py-2.5 ${sender ? 'text-white' : 'text-gray-900'}`}>{message}</p>
      </div>
      { sender && <img className="w-8 h-8 rounded-full" src={avatarSrc} alt={name + ' image'} />}
    </div>
  );
};

export default Message;
