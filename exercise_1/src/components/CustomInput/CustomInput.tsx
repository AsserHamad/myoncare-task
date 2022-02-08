import React from 'react';
import './CustomInput.scss';
import { CustomInputPropsI } from './CustomInput.types';

const CustomInput = (props : CustomInputPropsI) => {
    const changeHandler = (e : React.FormEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value, props.name);
    }

    return (
        <div className={'custom-input'}>
            <p className='custom-input-title'>{props.title}</p>
            <input placeholder={props.placeholder} onChange={changeHandler} type={props.type || 'text'} />
            <p className='custom-input-error'>{props.error}</p>
        </div>
    );
};

export default CustomInput;
