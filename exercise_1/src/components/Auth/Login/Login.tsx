import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../utils/apiRequests';
import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { FormI } from '../Register/Register.types';
import './Login.scss';

const Login = ({state, onRegisterRedirect} : {state : boolean, onRegisterRedirect : () => any}) => {
  const [form, setForm] = useState<FormI>({email: 'asserhamad96@gmail.com', password: 'abcd1234'});
  const [errors, setErrors] = useState({email: '', password: ''});
  const [loginError, setLoginError] = useState('');

  const {setUser} = useAuthContext();

  const loginHandler = useCallback(async () => {
    login(form.email, form.password)
    .then(({data}) => {
      setErrors({email: '', password: ''});
      localStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
    })
    .catch((err : AxiosError) => {
      if(err.response?.data.errors) {
        const newErrors = err.response?.data.errors.reduce(
          (prev : {[key : string] : string}, curr : {param : string, msg : string}) => ({...prev, [curr.param] : curr.msg}), {});
          setErrors(newErrors);
      } else {
        setErrors({email: '', password: ''});
        setLoginError(err.response?.data.message);
      }
    });
    
  }, [form, setUser]);

  const onFormChangeHandler = (value : string, name : string) => {
    setForm(form => {
      form[name] = value;
      return form;
    })
  }

  return (
    <div className={`login ${!state && 'login-inactive'}`}>
      <p className='login-join'>WELCOME BACK</p>
      <p className='login-title'>Login to MyOncare</p>
      <p className='login-login-text'>Do't have an account? <span className='login-login-button' onClick={onRegisterRedirect}>Register</span></p>
      <p className='login-error'>{loginError}</p>
      <CustomInput onSubmit={loginHandler} error={errors.email} title={'E-Mail'} onChange={onFormChangeHandler} placeholder={'johndoe@mail.com'} name="email" />
      <CustomInput onSubmit={loginHandler} error={errors.password} title={'Password'} onChange={onFormChangeHandler} placeholder={'6+ Characters'} type={'password'} name="password" />
      <CustomButton text={'Login'} onSubmit={loginHandler} />
    </div>
  );
};

export default Login;
