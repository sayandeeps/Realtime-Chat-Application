import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import Searchbox from "./searchbox";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { IInitialState, IAuthContext } from "../../types/types";
import { AuthContext } from "../context/AuthContext";
import Modalt from "./Modalt";
import { pink } from "@mui/material/colors";

export default function SheetDemo() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { user } = useContext<IAuthContext>(AuthContext);
  const [student, setStudent] = useState<any>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8800/api/notifications/user/${user._id}`);
      const student = await axios.get(`http://localhost:8800/api/users/${response.data[0].from}`);
      setStudent(student.data);
      const notifications = response.data;
      console.log("notification", response.data);
      setNotifications(notifications);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAccept = async (notification: any) => {
    try {
      console.log("notification1", notification?.from);
      console.log("notification2", notification?.toSend);
      console.log("notification3", notification?._id);
      const response = await axios.put(`http://localhost:8800/api/users/${notification.from}/connect`, {
        userId: notification.toSend,
      });
      console.log(response.data);
      // detele the notification
      alert('You are now connected to ' + student.username)
      const convo = await axios.post(`http://localhost:8800/api/conversations/`, {"senderId": notification?.from, "receiverId": notification?.toSend})
      console.log(convo.data);
      const msg = await axios.post(`http://localhost:8800/api/messages/`, {"conversationId": convo.data._id, "sender": notification.toSend, "text": "Hello, I am " + user.username +"do let me know how can i help you !!"})
      await axios.delete(`http://localhost:8800/api/notifications/${notification._id}`);
      window.location.reload();      
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={fetchNotifications} variant="outline">
          <span>
            <NotificationImportantIcon sx={{ color: pink[500] }} />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Stay up to date with your notifications
          </SheetDescription>
        </SheetHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification?._id}>
                <div
                  id="alert-additional-content-1"
                  className="my-4  p-4  text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
                  role="alert"
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Accept Request</h3>
                  </div>
                  <div className="mt-2 mb-4 text-sm">
                    {notification.text}
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="text-white bg-green-500 border  hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2  text-center     :hover:bg-blue-600     :border-blue-600     :text-blue-400     :hover:text-white     :focus:ring-blue-800"
                      onClick={() => handleAccept(notification)}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-500 border  hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center     :hover:bg-blue-600     :border-blue-600     :text-blue-400     :hover:text-white     :focus:ring-blue-800"
                    >
                      Dismiss
                    </button>
                    <div className="   inline-flex items-center">
                      <Modalt member={student} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <SheetFooter>
          <Button onClick={fetchNotifications} variant="outline">
            Refresh
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}