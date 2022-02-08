import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Auth from './pages/Auth/Auth';
import { useAuthContext } from './contexts/AuthContext';
import Home from './pages/Home/Home';

const AppRoutes = () => {
    const {authenticated} = useAuthContext();
  return (
    <Router>
        {authenticated ? (
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        ) : (
            <Routes>
                <Route path="/" element={<Auth/>} />
            </Routes>
        )}
    </Router>
  );
};

export default AppRoutes;
