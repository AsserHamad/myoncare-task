import { useState } from 'react';
import InformationContainer from '../../components/Auth/InformationContainer/InformationContainer';
import Login from '../../components/Auth/Login/Login';
import Register from '../../components/Auth/Register/Register';
import './Auth.scss';

const Auth = () => {
  const [state, setState] = useState<'register'|'login'>('register');
  return (
    <div className='auth'>
      <div className='auth-inner'>
        <InformationContainer />
        <div className='auth-inner-right'> 
          <Register onLoginRedirect={() => setState('login')} state={state === 'register'} />
          <Login onRegisterRedirect={() => setState('register')} state={state === 'login'} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
