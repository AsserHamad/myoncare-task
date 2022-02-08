import AppRoutes from './AppRoutes';
import { AuthContextProvider as Context } from './contexts/AuthContext';


function App() {
  return (
      <Context>
        <AppRoutes />
      </Context>
  );
}

export default App;
