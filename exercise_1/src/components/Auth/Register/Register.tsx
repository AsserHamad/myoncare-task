import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { register } from '../../../utils/apiRequests';
import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import './Register.scss';
import { FormI, RegisterPropsI } from './Register.types';

const Register = ({state, onLoginRedirect} : RegisterPropsI) => {
  const [form, setForm] = useState<FormI>({});
  const [errors, setErrors] = useState({email: '', password: ''});
  const {setUser} = useAuthContext();

  const registerHandler = useCallback(async () => {
    console.log('registering');
    register(form.email, form.password)
    .then(({data}) => {
      setErrors({email: '', password: ''});
      localStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      console.log(data);
    })
    .catch((err : AxiosError) => {
      const newErrors = err.response?.data.errors.reduce(
        (prev : {[key : string] : string}, curr : {param : string, msg : string}) => ({...prev, [curr.param] : curr.msg}), {});
      setErrors(newErrors);
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
      <CustomInput error={errors.email} title={'E-Mail'} onChange={onFormChangeHandler} placeholder={'johndoe@mail.com'} name="email" />
      <CustomInput error={errors.password} title={'Password'} onChange={onFormChangeHandler} placeholder={'6+ Characters'} type={'password'} name="password" />
      <CustomButton text={'Create an account'} onSubmit={registerHandler} />
    </div>
  );
};

export default Register;
