import React from 'react';
import './CustomInput.scss';
import { CustomInputPropsI } from './CustomInput.types';

const CustomInput = (props : CustomInputPropsI) => {
    const changeHandler = (e : React.FormEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value, props.name);
    }

    const keyDownHandler = (e : React.KeyboardEvent) => {
        if(e.key === 'Enter' && props.onSubmit)
            props.onSubmit();
    }

    return (
        <div className={'custom-input'}>
            <p className='custom-input-title'>{props.title}</p>
            <input onKeyDown={keyDownHandler} placeholder={props.placeholder} onChange={changeHandler} type={props.type || 'text'} defaultValue={props.initialValue} />
            <p className='custom-input-error'>{props.error}</p>
        </div>
    );
};

export default CustomInput;
