// components/Message.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTimeAgo } from 'next-timeago';
import Image from 'next/image';

interface MessageProps {
  sender?: boolean; // Optional boolean to differentiate sender and receiver styles
  message: any;
}

const Message: React.FC<MessageProps> = ({
  sender = false,
  message,
}) => {
  const { TimeAgo } = useTimeAgo();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

   
    const user = message?.sender;

    const getUser = async () => {
      try{
      const res = await axios.get(`http://localhost:8800/api/users/${user}`);
      setUser(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getUser();
  
},[message]);


  return (
    <div className={`flex items-start gap-2.5 mb-2 ${sender ? 'justify-end' : 'justify-start rtl'}`}>
      { !sender && <img className="w-8 h-8 rounded-full" src={user?.profilePicture} alt={name + ' image'} />}
      <div className={`flex flex-col w-full max-w-[320px] leading-5 p-4 border-gray-200 ${sender ? 'bg-indigo-500 hover:bg-indigo-600 rounded-es-xl' : 'bg-gray-100 hover:bg-gray-200 rounded-e-xl'}`}>
        <div className="flex items-center space-x-2">
        {message?.text.startsWith('data:image/')? (
  <Image
    src={decodeURIComponent(message?.text)}
    alt="image"
    width={300}
    height={200}
  />
) : (
  <span className={`text-sm font-semibold ${sender? 'text-white' : 'text-gray-900'}`}>
    {message?.text}
  </span>
)}          <span className={`text-sm font-normal text-gray-500 ${sender ? 'text-white' : 'text-gray-500'}`}></span>
        </div>
        <p className={`text-xs font-normal py-2.5 ${sender ? 'text-white' : 'text-gray-500'}`}>
 { message?.createdAt ? <TimeAgo date={message?.createdAt} /> : "just now"}
</p>      </div>
      { sender && <img className="w-8 h-8 rounded-full" src={user?.profilePicture} alt={name + ' image'} />}
    </div>
  );
};

export default Message;
