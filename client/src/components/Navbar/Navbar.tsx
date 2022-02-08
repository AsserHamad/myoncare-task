import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { UserI } from '../../types/general.types';
import './Navbar.scss';

const Navbar = () => {
    const {user, logout} : {user : UserI, logout: () => void} = useAuthContext();
  return(
      <div className='navbar'>
          <Link to="/" className='logo-container'>
            <img alt="logo" src="/logo.svg" />
          </Link>
          <div className='right-container'>
              <div className='right-container-name'>{user.name}</div>
              <div className='right-container-logout' onClick={logout}>Logout</div>
          </div>
      </div>
  );
};

export default Navbar;
