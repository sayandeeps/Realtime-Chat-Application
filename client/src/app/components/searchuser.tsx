import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Modalt from './Modalt';


const SearchUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<any>('');

  useEffect(() => {
    axios.get('http://localhost:8800/api/users')
      .then(response => {
        const expertUsers = response.data.filter((user:any) => user.isExpert);
        setUsers(expertUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);



  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = searchTerm ? users.filter((user) => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase());
  }) : users;

    console.log('filteredUsers:', filteredUsers);
  return (
    <>
    
    <div className="mt-4 ml-9 relative  text-gray-600">
        <input value={searchTerm} onChange={handleSearch} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search Experts"/>
        <button type="submit" className="absolute  ">
         
        </button>
      </div>
    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-5">
  <div className="bg-gray-100 py-2 px-4">
    <h2 className="text-xl font-semibold text-gray-800">Top Experts</h2>
  </div>
  {filteredUsers.length > 0 ? (
    <ul className="divide-y divide-gray-200">
      {filteredUsers.map((user, index) => (
        <li key={user._id} className="flex items-center py-4 px-6">
          <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
          <img
            className="w-12 h-12 rounded-full object-cover mr-4"
            src={user.profilePicture ? user.profilePicture : 'https://cdn-icons-png.freepik.com/512/219/219986.png'}
            alt="User avatar"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">{user.username}</h3>
            <p className="text-gray-600 text-base">{/* add points or other user info here */}</p>
          </div>
          <Modalt member={user}/>
        </li>

      ))}
    </ul>
  ) : (
    <p className="text-gray-600 text-base py-4 px-6">No users found.</p>
  )}
</div>
  </>
  );
};

export default SearchUser;