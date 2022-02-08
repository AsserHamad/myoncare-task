import './App.css';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from './pages/Auth/Auth';
import { useAuthContext } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import UserDetails from './pages/UserDetails/UserDetails';
import Navbar from './components/Navbar/Navbar';

const AppRoutes = () => {
    const {authenticated} = useAuthContext();
  return (
    <Router>
        {authenticated ? (
          <>
            <Navbar />
            <Routes>
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users" element={<Home />} />
                <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
          </>
        ) : (
            <Routes>
                <Route path="/" element={<Auth/>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        )}
    </Router>
  );
};

export default AppRoutes;
