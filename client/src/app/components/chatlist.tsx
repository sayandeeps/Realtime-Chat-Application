// components/ChatEntry.tsx

import React from 'react';

interface User {
  name: string;
  profileImage: string;
}

interface ChatEntryProps {
  user: User;
  message: string;
  date: string;
  unreadCount?: number;
  online?: boolean;
}

const ChatEntry: React.FC<ChatEntryProps> = ({ user, message, date, unreadCount = 0, online = false }) => {
  return (
    <div
      className={`entry mb-4 flex transform cursor-pointer rounded border-l-4 ${
        unreadCount > 0 ? 'border-red-500' : 'border-transparent'
      } bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105`}
    >
      <div className="flex-2 relative">
        <div className="relative h-12 w-12">
          <img
            className="mx-auto h-12 w-12 rounded-full"
            src={user.profileImage}
            alt="chat-user"
          />
          <span
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
              online ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="w-32 truncate">
          <span className="text-gray-800">{user.name}</span>
        </div>
        <div>
          <small className="text-gray-600">{message}</small>
        </div>
      </div>
      <div className="flex-2 text-right">
        <div>
          <small className="text-gray-500">{date}</small>
        </div>
        {unreadCount > 0 && (
          <div className="mt-1">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs">
              {unreadCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatEntry;
