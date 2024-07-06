"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Searchbox from "../app/components/searchbox";
import Sheettest from "../app/components/sheettest";
import Chatcircle from "../app/components/chatonline";
import Modalt from "../app/components/Modalt";
import ChatEntry from "../app/components/chatlist";
import Message from "../app/components/message";

interface User {
  name: string;
  profileImage: string;
}

interface ChatData {
  user: User;
  message: string;
  date: string;
  unreadCount: number;
  online: boolean;
}

const page = () => {
  const chatData: ChatData[] = [
    {
      user: {
        name: "Mercedes Yemelyan",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
      },
      message: "Yea, Sure!",
      date: "15 April",
      unreadCount: 3,
      online: true,
    },

    {
      user: {
        name: "Mercedes Yemelyan",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
      },
      message: "Yea, Sure!",
      date: "15 April",
      unreadCount: 3,
      online: true,
    },
    {
      user: {
        name: "Mercedes Yemelyan",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
      },
      message: "Yea, Sure!",
      date: "15 April",
      unreadCount: 3,
      online: true,
    },
    {
      user: {
        name: "Mercedes Yemelyan",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
      },
      message: "Yea, Sure!",
      date: "15 April",
      unreadCount: 3,
      online: true,
    },
    {
      user: {
        name: "Mercedes Yemelyan",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
      },
      message: "Yea, Sure!",
      date: "15 April",
      unreadCount: 3,
      online: true,
    },
    {
      user: {
        name: "Mercedes Yemelyan",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
      },
      message: "Yea, Sure!",
      date: "15 April",
      unreadCount: 3,
      online: true,
    },
  ];

  return (
    <div className="messenger h-dvh flex overflow-hidden ">
      {/* section 1 */}
      <div className="chatmenu flex-grow border overflow-y-auto flex-grow-1 p-2 w-1/4">
        <div className="sticky top-0 bg-white z-10">
          <Searchbox />
          {/* online users */}
          <div className="p-4 pb-1 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-bold text-gray-900 mb-4">
              Experts Available <Modalt />
            </h1>
            <div className="flex gap-6 overflow-x-hidden scrollbar-hide mb-4">
              {Array(13)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Chatcircle />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="h-[80svh] mt-4 overflow-y-auto">
          {chatData.map((chat, index) => (
            <ChatEntry
              key={index}
              user={chat.user}
              message={chat.message}
              date={chat.date}
              unreadCount={chat.unreadCount}
              online={chat.online}
            />
          ))}
        </div>
      </div>

      <div className="chatbox flex flex-col  h-[91svh] border w-2/4 p-4">
        <div className="chatboxheader flex items-center justify-between p-2 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
              alt=""
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">John Doe</h1>
              <p className="text-sm text-gray-500 pl-1">Expert</p>
            </div>
          </div>
          <div>
            <Button variant="outline">Profile</Button>
          </div>
        </div>
        <div className="messages flex-grow mt-4 overflow-y-auto">
          <Message
            sender
            name="John Doe"
            time="11:30"
            message="Hey there! How's it going?"
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />
          <Message
            name="Bonnie Green"
            time="11:46"
            message="That's awesome. I think our users will really appreciate the improvements."
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />
          <Message
            sender
            name="John Doe"
            time="11:30"
            message="Hey there! How's it going?"
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />
          <Message
            name="Bonnie Green"
            time="11:46"
            message="That's awesome. I think our users will really appreciate the improvements."
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />

          <Message
            name="Bonnie Green"
            time="11:46"
            message="That's awesome. I think our users will really appreciate the improvements."
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />
          <Message
            sender
            name="John Doe"
            time="11:30"
            message="Hey there! How's it going?"
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />
          <Message
            name="Bonnie Green"
            time="11:46"
            message="That's awesome. I think our users will really appreciate the improvements."
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />

          <Message
            name="Bonnie Green"
            time="11:46"
            message="That's awesome. I think our users will really appreciate the improvements."
            avatarSrc="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
          />
        </div>
        <div className="textareabottom fixed bottom-0 w-2/4 bg-white ">
          <div className="flex flex-row items-center h-16 rounded-xl bg-white ">
            <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="chatonline flex-grow flex-grow-3.5 border w-1/4">
        <div className="chatonlinewrapper">online</div>
      </div>
    </div>
  );
};

export default page;
