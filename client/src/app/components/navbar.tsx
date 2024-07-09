import React, { useContext } from 'react'
import AuthContext from "../context/AuthContext";
import { IAuthContext } from '@/types/types';
import Sheettest from './sheettest';
import { Button } from '@/components/ui/button';

const navbar = () => {
    const { user, isFetching, error, dispatch, logout } =
    useContext<IAuthContext>(AuthContext);
  return (
    
   <>
   <header className="antialiased">
  <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5  :bg-gray-800">
      <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
              
              <a href="https://flowbite.com" className="flex mr-4">
                <img src="https://cdn-icons-png.flaticon.com/512/5619/5619967.png" className="mr-3 h-12 " alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap  :text-white">Welcome back {user?.username},</span>
              </a>
              
            </div>
          <div className="flex items-center lg:order-2">
              <button type="button" className="hidden sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2  :bg-primary-600  :hover:bg-primary-700 focus:outline-none  :focus:ring-primary-800"><svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> New Widget</button>
              <button id="toggleSidebarMobileSearch" type="button" className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100  :text-gray-400  :hover:bg-gray-700  :hover:text-white">
                  <span className="sr-only">Search</span>
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
              </button>
             
              <div className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg  :divide-gray-600  :bg-gray-700" id="notification-dropdown">
                  <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50  :bg-gray-700  :text-gray-400">
                      Notifications
                  </div>
                  <div>
                  <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100  :hover:bg-gray-600  :border-gray-600">
                      <div className="flex-shrink-0">
                      <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar"/>
                      <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700  :border-gray-700">
                          <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/><path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/></svg>
                      </div>
                      </div>
                      <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5  :text-gray-400">New message from <span className="font-semibold text-gray-900  :text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
                          <div className="text-xs font-medium text-primary-700  :text-primary-400">a few moments ago</div>
                      </div>
                  </a>
                  <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100  :hover:bg-gray-600  :border-gray-600">
                      <div className="flex-shrink-0">
                      <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar"/>
                      <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white  :border-gray-700">
                          <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/></svg>
                      </div>
                      </div>
                      <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5  :text-gray-400"><span className="font-semibold text-gray-900  :text-white">Jese leos</span> and <span className="font-medium text-gray-900  :text-white">5 others</span> started following you.</div>
                          <div className="text-xs font-medium text-primary-700  :text-primary-400">10 minutes ago</div>
                      </div>
                  </a>
                  <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100  :hover:bg-gray-600  :border-gray-600">
                      <div className="flex-shrink-0">
                      <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="Joseph McFall avatar"/>
                      <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white  :border-gray-700">
                        <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"> <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/> </svg>                      
                      </div>
                      </div>
                      <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5  :text-gray-400"><span className="font-semibold text-gray-900  :text-white">Joseph Mcfall</span> and <span className="font-medium text-gray-900  :text-white">141 others</span> love your story. See it and view more stories.</div>
                          <div className="text-xs font-medium text-primary-700  :text-primary-400">44 minutes ago</div>
                      </div>
                  </a>
                  <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100  :hover:bg-gray-600  :border-gray-600">
                      <div className="flex-shrink-0">
                      <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="Roberta Casas image"/>
                      <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white  :border-gray-700">
                          <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/></svg>
                      </div>
                      </div>
                      <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5  :text-gray-400"><span className="font-semibold text-gray-900  :text-white">Leslie Livingston</span> mentioned you in a comment: <span className="font-medium text-primary-700  :text-primary-500">@bonnie.green</span> what do you say?</div>
                          <div className="text-xs font-medium text-primary-700  :text-primary-400">1 hour ago</div>
                      </div>
                  </a>
                  <a href="#" className="flex py-3 px-4 hover:bg-gray-100  :hover:bg-gray-600">
                      <div className="flex-shrink-0">
                      <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png" alt="Robert image"/>
                      <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white  :border-gray-700">
                          <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14"><path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z"/></svg>
                      </div>
                      </div>
                      <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5  :text-gray-400"><span className="font-semibold text-gray-900  :text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
                          <div className="text-xs font-medium text-primary-700  :text-primary-400">3 hours ago</div>
                      </div>
                  </a>
                  </div>
                  <a href="#" className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100  :bg-gray-700  :text-white  :hover:underline">
                      <div className="inline-flex items-center ">
                      <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                      View all
                      </div>
                  </a>
              </div>
              <div className='flex gap-3'>
              <Sheettest/>

              <Button className="bg-red-600" onClick={logout}>Logout</Button>
              </div>
             
             
          </div>
      </div>
  </nav>
</header>
   </>
  )
}

export default navbar