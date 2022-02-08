import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/Auth/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { UserI } from '../../types/general.types';
import { deleteUser, getUser, updateUser } from '../../utils/apiRequests';
import { extractDateFromDateTime } from '../../utils/functions.util';
import './UserDetails.scss';

const UserDetails = () => {
    const {id} = useParams();
    const [user, setUser] = useState<UserI>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            (async () => {
                const {data : user} = await getUser(id);
                setName(user.name || '');
                setEmail(user.email || '');
                setUser(user);
            })();
        }

    }, [id]);

    if(!id)
        return <div>Not a valid ID</div>

    const updateHandler = async () => {
        try {
            await updateUser(id, email, name);
            setUser(user => ({...user, email, name}));
        } catch (e) {
            console.log(e);
        }
    }

    const deleteHandler = async () => {
        try {
            await deleteUser(id);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    const onNameChangeHandler = (value : string) => {
      setName(value);
    }

    const onEmailChangeHandler = (value : string) => {
      setEmail(value);
    }

    if(!user)
        return <div>Loading...</div>
  return (
      <div className='user-details'>
          <div className='user-details-header'>
            <div className='banner'>
                <p className='banner-name'>{user.name}</p>
                <p className='banner-since'>Member since: {extractDateFromDateTime(user.createdAt || '')}</p>
            </div>
          </div>
          <form>
              <CustomInput name='name' title='Name' onChange={onNameChangeHandler} initialValue={name} />
              <CustomInput name='email' title='E-Mail' onChange={onEmailChangeHandler} initialValue={email} />
          </form>
          <div className='buttons'>
              <CustomButton onSubmit={updateHandler} text={'Update'} />
              <CustomButton onSubmit={deleteHandler} text={'Delete'} />
          </div>
      </div>
  )
};

export default UserDetails;
