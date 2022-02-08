import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { register } from '../../../utils/apiRequests';
import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import './Register.scss';
import { FormI, RegisterPropsI } from './Register.types';

const Register = ({state, onLoginRedirect} : RegisterPropsI) => {
  const [form, setForm] = useState<FormI>({email: '', password: ''});
  const [errors, setErrors] = useState({email: '', password: ''});
  const [registerError, setRegisterError] = useState('');
  const {setUser} = useAuthContext();

  const registerHandler = useCallback(async () => {
    register(form.email, form.password)
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
        setRegisterError(err.response?.data.message);
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
    <div className={`register ${!state && 'register-inactive'}`}>
      <p className='register-join'>JOIN OUR PROGRAM</p>
      <p className='register-title'>Sign up to MyOncare</p>
      <p className='register-login-text'>Already a member? <span className='register-login-button' onClick={onLoginRedirect}>Log in</span></p>
      <p className='register-error'>{registerError}</p>
      <CustomInput onSubmit={registerHandler} error={errors.email} title={'E-Mail'} onChange={onFormChangeHandler} placeholder={'johndoe@mail.com'} name="email" />
      <CustomInput onSubmit={registerHandler} error={errors.password} title={'Password'} onChange={onFormChangeHandler} placeholder={'6+ Characters'} type={'password'} name="password" />
      <CustomButton text={'Create an account'} onSubmit={registerHandler} />
    </div>
  );
};

export default Register;
