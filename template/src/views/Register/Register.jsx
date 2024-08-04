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
  avatarUrl: null,
};

const Register = () => {
  //const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(registerInitialData);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const { username, firstName, lastName, email, password, avatarUrl } =
    registrationData;

  const handlePrevClick = () => {
    if (step === 1) return;
    setStep(s => s - 1);
  };

  const handleNextClick = () => {
    if (step === 5) return;
    setStep(s => s + 1);
  };

  const handleInputChange = key => e => {
    setRegistrationData({
      ...registrationData,
      [key]: e.target.value,
    });
  };

  const handleFileChange = e => {
    setRegistrationData({
      ...registrationData,
      avatarUrl: e.target.files[0],
    });
  };

  //validations will be in helper functions in future
  const handleRegister = async () => {
    setLoading(true);
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
      console.log(avatarUrl);
      await register(username, firstName, lastName, email, password, avatarUrl);
      navigate('/feed');
    } catch (error) {
      alert(`registration error ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Welcome to ∀ PXL</h1>
      <p>Let&apos;s get to meet you</p>
      {step === 1 && (
        <>
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            required
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
            autoFocus
            required
            type="text"
            value={firstName}
            name="firstName"
            id="firstName"
            onChange={handleInputChange('firstName')}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            required
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
            autoFocus
            required
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
            autoFocus
            required
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={handleInputChange('password')}
          />
        </>
      )}

      {step === 5 && (
        <>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={e => handleFileChange(e)}
          />
        </>
      )}

      <p>Step {step} / 5</p>
      <div className="controllers">
        {step === 1 ? (
          <button onClick={() => navigate('/')}>&times; Cancel</button>
        ) : (
          <button onClick={handlePrevClick}>&larr; Back</button>
        )}
        {step === 5 ? (
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
