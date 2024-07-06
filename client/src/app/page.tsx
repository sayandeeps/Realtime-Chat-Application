"use client";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Searchbox from "../app/components/searchbox";
import Sheettest from "../app/components/sheettest";
import Chatcircle from "../app/components/chatonline";
import Modalt from "../app/components/Modalt";
import ChatEntry from "../app/components/chatlist";
import Message from "../app/components/message";
import AuthContext from "./context/AuthContext";
import { IAuthContext } from "@/types/types";
import axios from "axios";
import {io} from "socket.io-client";

interface User {
  name: string;
  profileImage: string;
}

// interface ChatData {
//   user: User;
//   message: string;
//   date: string;
//   unreadCount: number;
//   online: boolean;
// }

const page = () => {
  const {user, isFetching, error, dispatch , logout} = useContext<IAuthContext>(AuthContext);
  const [conversation, setConversation] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const scrollref = useRef<any>();

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  },[]);

  useEffect(() => {
    socket?.current?.emit("addUser",user?._id);
    socket?.current?.on("getUsers",(users: any)=>{
      console.log(users);
    });
  }
  ,[user]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversations/"+user._id);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchConversation();
  }
  ,[user?._id]);

  

  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/messages/" + (currentChat as any)?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    // Call fetchMessages function here to ensure it runs on currentChat change
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: (currentChat as any)._id,
    };

    const receiverId = (currentChat as any).members.find(
      (member: any) => member !== user._id
    );

    const sendMessage = async () => {
      try {
        const res=await axios.post("http://localhost:8800/api/messages/", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
   

    sendMessage();
  }

  console.log(currentChat)
  const [chatName,setchatName]=useState<any>(null);
  useEffect(() => {
    const fetchChatName = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users/"+(currentChat as any).members.find((member:any) => member !== user._id));
        setchatName(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if(currentChat){
      fetchChatName();
    }
  }
  ,[currentChat]);

  useEffect(() => { 
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }
  ,[messages]);
  


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
        <div className="h-auto mt-4 overflow-y-auto">
          {conversation.map((chat) => (
            <div onClick={()=>setCurrentChat(chat)}>
            <ChatEntry
              chat={chat}
              currentUser={user}
            />
            </div>
          ))}
        </div>
      </div>
      {currentChat ? <>
      <div className="chatbox flex flex-col  h-[91svh] border w-2/4 p-4">
      <div className="chatboxheader flex items-center justify-between p-2 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src={chatName?.profilePicture ? chatName?.profilePicture : "https://cdn-icons-png.freepik.com/512/219/219986.png"}
              alt=""
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">{chatName?.username}</h1>
              <p className="text-sm text-gray-500 pl-1">Expert</p>
            </div>
          </div>
          <div>
            <Button variant="outline">Profile</Button>
          </div>
        </div>
       
        <div className="messages flex-grow mt-4 overflow-y-auto">
        {messages.map((message) => (
          <div ref={scrollref}>
          <Message
            sender={(message as any)?.sender === user?._id}
            message={message}
          />
          </div>
        ))}
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
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
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
              <button onClick={handleSubmit} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
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
      </>
        : <span className="flex-grow border w-2/4">No chat selected</span>}

      <div className="chatonline flex-grow flex-grow-3.5 border w-1/4">
        <div className="chatonlinewrapper">{user &&(
        <a href="#" onClick={logout}>
            Logout
          </a>
          )}
          </div>
      </div>
    </div>
  );
};

export default page;
