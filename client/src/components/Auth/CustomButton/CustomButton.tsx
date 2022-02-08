import './CustomButton.scss';
import { CustomButtonPropsI } from './CustomButton.types';

const CustomButton = (props : CustomButtonPropsI) => {
  return (
    <div className='custom-button' onClick={props.onSubmit}>
        {props.text}
    </div>
  );
};

export default CustomButton;
