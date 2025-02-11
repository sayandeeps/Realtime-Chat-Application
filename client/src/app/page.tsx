"use client";
import React, { use, useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { io } from "socket.io-client";
import CircularProgress from '@mui/material/CircularProgress';
import Searchuser from "../app/components/searchuser";
import Navbar from '../app/components/navbar';

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
  const { user, isFetching, error, dispatch, logout } =
    useContext<IAuthContext>(AuthContext);
  const [conversation, setConversation] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [imageChat, setImageChat] = useState<any>(null);
  const [page, setPage] = useState(1);

  const scrollref = useRef<any>();
  const fileRef = useRef<any>();

  const selectFile = () => {
    fileRef.current.click();
  };
  const fileSelected = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      // console.log(typeof base64);
      // setMessages([...messages, {
      //   sender: user?._id,
      //   text: base64,
      //   conversationId: (currentChat as any)._id,
      // }]);
      sendMessage({
        sender: user?._id,
        text: base64,
        conversationId: (currentChat as any)._id,
      });

      socket.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId,
        text: base64,
      });
    };
  };

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user?._id);
    socket?.current?.on("getUsers", (users: any) => {
      // console.log(users);
    });
  }, [user]);

  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (ausers: any) => {
      const filteredUsers = ausers.filter((user: any) => user.userId !== null);
      const availableUsersComponents = filteredUsers.map((user: any, i: any) => (
        <div key={i} className="flex-shrink-0">
          <Chatcircle members={user} />
        </div>
      ));
      setAvailableUsers(availableUsersComponents);
    });
  }, []);
// console.log("idhar dekho",availableUsers.map((user: any) => user.props.children.props.members.userId));
  useEffect(() => {
    if (!user?._id) {
      // console.log("User ID is not defined");
      return;
    }

    const fetchConversation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/conversations/" + user?._id
        );
        // console.log("Fetched conversation:", res.data);
        setConversation(res.data);
      } catch (err) {
        console.error("Error fetching conversation:", err);
      }
    };

    fetchConversation();
  }, [user?._id]);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/messages/" + (currentChat as any)?._id,
          {
            params: {
              page: page,
              limit: 10,
            },
          }
        );
        // console.log("Fetched messages:", currentChat , res.data.results);

        setMessages(res.data.results);
        if (res.data.next) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    setPage(1);
    setMessages([]);

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  // console.log(currentChat ,page)

  const fetchMoreMessages = useCallback( async () => {
    if (!hasMore) {
      console.log("No more messages to fetch");
      return;
    }

    try {
      const nextPage = page + 1;
      await setPage(nextPage);
      const res = await axios.get(
        "http://localhost:8800/api/messages/" + (currentChat as any)._id,
        {
          params: {
            page: nextPage,
            limit: 10,
          },
        }
      );
      console.log("Fetched more messages:", res.data.results);
      setMessages([...messages, ...res.data.results]);
      if (res.data.next) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentChat, page, messages, hasMore]);

  const receiverId = (currentChat as any)?.members?.find(
    (member: any) => member !== user?._id
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: (currentChat as any)._id,
    };
    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });
    sendMessage(message);
    setNewMessage("");
  };
  const sendMessage = async (message: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/messages/",
        message
      );
      setMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(currentChat)
  const [chatName, setchatName] = useState<any>(null);
  useEffect(() => {
    const fetchChatName = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/" +
            (currentChat as any).members.find(
              (member: any) => member !== user?._id
            )
        );
        setchatName(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) {
      fetchChatName();
    }
  }, [currentChat]);

  const topref = useRef<any>();
const [loadingMore, setLoadingMore] = useState(false);

useEffect(() => {
  scrollref.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

useEffect(() => {
  const handleScroll = () => {
    if (topref.current?.scrollTop === 0 && hasMore && !loadingMore) {
      setLoadingMore(true);
      fetchMoreMessages().finally(() => {
        setLoadingMore(false);
      });
    }else if(!hasMore){
      setLoadingMore(false);
    }
  };
  topref.current?.addEventListener('scroll', handleScroll);
  return () => {
    topref.current?.removeEventListener('scroll', handleScroll);
  };
}, [hasMore, fetchMoreMessages, loadingMore]);
  return (
    <>
    <Navbar/>
    <div className="messenger h-dvh flex overflow-hidden ">
      {/* section 1 */}
      <div className="chatmenu flex-grow border overflow-y-auto flex-grow-1 p-2 w-1/4">
        <div className="sticky top-0 bg-white z-10">
          {/* <Searchbox /> */}
          {/* online users */}
          <div className="p-4 pb-1 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-bold text-gray-900 mb-4">
              Users Available 
            </h1>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide mb-4">
            {availableUsers}
            </div>
          </div>
        </div>
        <div className="h-auto mt-4 overflow-y-auto">
          {conversation.map((chat) => (
            <div onClick={() => setCurrentChat(chat)}>
              <ChatEntry chat={chat} currentUser={user} isOnline={availableUsers.map((user: any) => user.props.children.props.members.userId)} />
            </div>
          ))}
        </div>
      </div>
      {currentChat ? (
        <>
          <div className="chatbox flex flex-col  h-[91svh] border w-2/4 p-4">
            <div className="chatboxheader flex items-center justify-between p-2 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    chatName?.profilePicture
                      ? chatName?.profilePicture
                      : "https://cdn-icons-png.freepik.com/512/219/219986.png"
                  }
                  alt=""
                />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {chatName?.username}
                  </h1>
                  <p className="text-sm text-gray-500 pl-1">Expert</p>
                </div>
              </div>
              <div>
              <Modalt member={chatName} />
              </div>
            </div>

            <div ref={topref} key={currentChat?._id} className="messages flex-grow mt-4 overflow-y-auto">
              {/* <Button
                onClick={fetchMoreMessages}
                variant="outline"
                disabled={!hasMore}
              >
                Load more
              </Button> */}
              {loadingMore && (
      <div className="loading-more justify-center">
        <CircularProgress color="inherit" size="50px" /> 
      </div>
    )}
              {([...messages]).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)).map((message) => (
                <div ref={scrollref}>
                  <Message
                    sender={(message as any)?.sender === user?._id}
                    message={message}
                  />
                </div>
              ))}
            
            </div>
            <div className="textareabottom fixed bottom-0  w-2/4 bg-white ">
              <div className="flex flex-row items-center h-16 rounded-xl bg-white ">
                <div>
                  <button
                    onClick={selectFile}
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <input
                      onChange={fileSelected}
                      ref={fileRef}
                      type="file"
                      style={{ display: "none" }}
                    />
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
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"></button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
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
      ) : (
        <span className="flex-grow text-6xl text-gray-400 w-2/4 m-auto ml-auto mr-auto pl-12">No chat selected</span>
      )}
{!user?.isExpert &&(
      <div className="chatonline flex-grow flex-grow-3.5 border w-1/4">
<Searchuser/>
      </div>
)
}
    </div>
    </>

  );
};

export default page;
