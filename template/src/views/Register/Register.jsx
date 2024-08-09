import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import Avatar from 'react-avatar'; // Import the Avatar component
import styles from './Register.module.scss';

const registerInitialData = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  avatarUrl: null,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(registerInitialData);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null); // State to hold the avatar preview

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
    const file = e.target.files[0];
    setRegistrationData({
      ...registrationData,
      avatarUrl: file,
    });
    setAvatarPreview(URL.createObjectURL(file)); // Set the avatar preview
  };

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
      await register(username, firstName, lastName, email, password, avatarUrl);
      navigate('/feed');
    } catch (error) {
      alert(`registration error ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Welcome to ∀ PXL</h1>
      <p className={styles.subtitle}>Let&apos;s get to meet you</p>
      <div className={styles.form}>
        {step === 1 && (
          <>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              autoFocus
              required
              type="text"
              value={username}
              name="username"
              id="username"
              className={styles.input}
              onChange={handleInputChange('username')}
            />
          </>
        )}

        {step === 2 && (
          <>
            <label htmlFor="firstName" className={styles.label}>
              First name
            </label>
            <input
              autoFocus
              required
              type="text"
              value={firstName}
              name="firstName"
              id="firstName"
              className={styles.input}
              onChange={handleInputChange('firstName')}
            />
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              required
              type="text"
              value={lastName}
              name="lastName"
              id="lastName"
              className={styles.input}
              onChange={handleInputChange('lastName')}
            />
          </>
        )}

        {step === 3 && (
          <>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              autoFocus
              required
              type="email"
              value={email}
              name="email"
              id="email"
              className={styles.input}
              onChange={handleInputChange('email')}
            />
          </>
        )}

        {step === 4 && (
          <>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              autoFocus
              required
              type="password"
              value={password}
              name="password"
              id="password"
              className={styles.input}
              onChange={handleInputChange('password')}
            />
          </>
        )}

        {step === 5 && (
          <>
            <label htmlFor="avatar" className={styles.label}>
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              className={styles.input}
              onChange={handleFileChange}
            />
            {avatarPreview && (
              <div className={styles.avatarPreview}>
                <Avatar src={avatarPreview} size="100" round={true} />{' '}
              </div>
            )}
          </>
        )}

        <p className={styles.step}>Step {step} / 5</p>
        <div className={styles.controllers}>
          {step === 1 ? (
            <button
              className={`${styles.button} ${styles.cancel}`}
              onClick={() => navigate('/')}
            >
              &times; Cancel
            </button>
          ) : (
            <button className={styles.button} onClick={handlePrevClick}>
              &larr; Back
            </button>
          )}
          {step === 5 ? (
            <button
              className={`${styles.button} ${styles.registerButton}`}
              onClick={handleRegister}
            >
              Register &#x2713;
            </button>
          ) : (
            <button className={styles.button} onClick={handleNextClick}>
              Next &rarr;
            </button>
          )}
        </div>
        <p className={styles.loginLink}>
          Already have an account? <Link to="/login">Login</Link> Instead
        </p>
      </div>
    </div>
  );
};

export default Register;
