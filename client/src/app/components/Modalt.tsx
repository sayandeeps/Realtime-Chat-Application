import * as React from "react";

import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IInitialState, IAuthContext } from "../../types/types";
import { AuthContext } from "../context/AuthContext";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const modalt: React.FC<any> = ({ member }: any) => {
  const { user } = useContext<IAuthContext>(AuthContext);
  const [self, setSelf] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${user._id}`);
        setSelf(res.data);
      }catch(error){
        console.error(error);
      }
      
    })();
  }, []);

  const [open, setOpen] = useState(false);
  const[sent, setSent] = useState(false);
  
  // console.log("member form", member._id);
  // console.log("current", user.connecedExpert);
  let status =  self?.connecedExpert?.includes(member?._id);


  const handleClick = async () => {
    if (!self?.connecedExpert?.includes(member?._id)) {
      try {
        const response = await axios.post('http://localhost:8800/api/notifications/', {
          toSend: member._id,
          from: user._id,
          text: `Would you like to get connected by ${user?.username}`
        });
        alert('Your Request has been sent')
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }else{
      alert('You are already connected')
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full ml-4 text-xs">
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expert's profile</DialogTitle>
        </DialogHeader>
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={
                member?.profilePicture
                  ? member?.profilePicture
                  : "https://cdn-icons-png.freepik.com/512/219/219986.png"
              }
              alt="Woman looking front"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{member?.username}</h2>
            <p className="text-gray-500">{member?.desc}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <div>2k</div>
            </li>
            <li className="flex flex-col items-center justify-between">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
              </svg>
              <div>10k</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              <div>15</div>
            </li>
          </ul>
          <div className="p-4 border-t mx-8 mt-2">
          <button
      className={`w-1/2 block mx-auto rounded-full ${
        self?.connecedExpert?.includes(member?._id) ? "bg-green-500" : "bg-blue-500"
      } hover:shadow-lg font-semibold text-white px-6 py-2`}
      onClick={handleClick}
    >
      {self?.connecedExpert?.includes(member?._id) ? "Connected" : "Connect"}
    </button>{" "}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default modalt;
