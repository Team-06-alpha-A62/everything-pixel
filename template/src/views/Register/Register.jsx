import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const registerInitialData = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  //usericon
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(registerInitialData);

  const { register } = useAuth();
  const navigate = useNavigate();

  const { username, firstName, lastName, email, password } = registrationData;

  const handlePrevClick = () => {
    if (step === 1) return;
    setStep(s => s - 1);
  };

  const handleNextClick = () => {
    if (step === 4) return;
    setStep(s => s + 1);
  };

  const handleInputChange = key => e => {
    setRegistrationData({
      ...registrationData,
      [key]: e.target.value,
    });
  };

  //validations will be in helper finctions in future
  const handleRegister = async () => {
    try {
      if (
        !registrationData.email ||
        !registrationData.password ||
        !registrationData.username ||
        !registrationData.firstName ||
        !registrationData.lastName
      ) {
        throw new Error('No credentials provided!');
      }
      await register(username, firstName, lastName, email, password);
      navigate('/feed');
    } catch (error) {
      alert(`registration error ${error.message}`);
    }
  };

  return (
    <>
      <h1>Welcome to ∀ PXL</h1>
      <p>Let&apos;s get to meet you</p>
      {step === 1 && (
        <>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={handleInputChange('username')}
          />
        </>
      )}

      {step === 2 && (
        <>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            value={firstName}
            name="firstName"
            id="firstName"
            onChange={handleInputChange('firstName')}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            value={lastName}
            name="lastName"
            id="lastName"
            onChange={handleInputChange('lastName')}
          />
        </>
      )}

      {step === 3 && (
        <>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            id="email"
            onChange={handleInputChange('email')}
          />
        </>
      )}

      {step === 4 && (
        <>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={handleInputChange('password')}
          />
        </>
      )}
      <p>Step {step} / 4</p>
      <div className="controllers">
        {step === 1 ? (
          <button onClick={() => navigate('/')}>&times; Cancel</button>
        ) : (
          <button onClick={handlePrevClick}>&larr; Back</button>
        )}
        {step === 4 ? (
          <button onClick={handleRegister}>Register &#x2713;</button>
        ) : (
          <button onClick={handleNextClick}>Next &rarr;</button>
        )}
      </div>
      <p>
        Already have an account? <Link to="/login">Login</Link> Instead
      </p>
    </>
  );
};

export default Register;
