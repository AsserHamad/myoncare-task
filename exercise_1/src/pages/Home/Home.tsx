import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useAuthContext } from '../../contexts/AuthContext';
import { UserI } from '../../types/general.types';
import { getAllUsers } from '../../utils/apiRequests';
import './Home.scss';

const Home = () => {
  const {user, logout} : {user : UserI, logout : () => void} = useAuthContext();
  const [users, setUsers] = useState<UserI[]>([]);
  useEffect(() => {
    getAllUsers()
    .then(({data : fetchedUsers}) => {
        setUsers(fetchedUsers)
    })
  }, []);
    return (
      <div className='home-container'>
          <Navbar />
          <p>Welcome, {user.name}</p>
          {users.map(user => {
              return <div key={user.id}>{user.name}</div>
          })}
          <button onClick={logout} >Logout</button>
      </div>
  );
};

export default Home;
