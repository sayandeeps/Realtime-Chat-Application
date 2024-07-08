import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
const chatonline: React.FC<any> = ({ members }:any) => {
  const [mem,setMem] = useState<any>(null)
  console.log(members)
  useEffect( () => {
    const fetchUser = ( async () => {
      try{
        const res = await axios.get(`http://localhost:8800/api/users/${members.userId}`);
        setMem(res.data);
      }
      catch(err){
        console.log(err)
      }
    })
   fetchUser()
  },[])
  console.log(mem)
  return (
    <div>
     <div className=''>
  <div className="relative inline-block">
    <img className="w-10 h-10 rounded-full" src= {mem?.profilePicture ? mem?.profilePicture : "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"} alt=""/>
    <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
    <p className='text-xs text-center w-full'>{mem?.username}</p>
  </div>
</div>
  </div>
  )
}

export default chatonline