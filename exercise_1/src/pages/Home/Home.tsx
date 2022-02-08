import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useAuthContext } from '../../contexts/AuthContext';
import { UserI } from '../../types/general.types';
import { getAllUsers } from '../../utils/apiRequests';
import { extractDateFromDateTime } from '../../utils/functions.util';
import './Home.scss';

const Home = () => {
  const {user} : {user : UserI} = useAuthContext();
  const [users, setUsers] = useState<UserI[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers()
    .then(({data : fetchedUsers}) => {
        setUsers(fetchedUsers)
    })
  }, []);

  const navigationHandler = (id : number) => {
    navigate(`/users/${id}`);
  }
  return (
    <div className='home'>
        <div className='home-container'>
          <p className='home-container-title'>Welcome, {user.name?.split(' ')[0]}</p>
          <p className='home-container-subtitle'>This is a list with all the registered users. Click any of them to start editing.</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                  return (
                    <tr onClick={() => navigationHandler(user.id || -1)} key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{extractDateFromDateTime(user.createdAt || '')}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Home;
