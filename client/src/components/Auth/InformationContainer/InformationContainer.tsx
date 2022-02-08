import './InformationContainer.scss';

const InformationContainer = () => {
  return (
    <div className='auth-information'>
        <div className='auth-information-container'>
            <img className='logo' src="/logo.svg" alt="logo" />
            <p className='title'>Manage your medical records, share relevant information and actively participate in your recovery</p>
        </div>
        <img className='doctor' src="/illustrations/doctor.svg" alt="logo" />
    </div>
  );
};

export default InformationContainer;
