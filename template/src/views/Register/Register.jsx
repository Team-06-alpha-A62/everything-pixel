import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import Avatar from 'react-avatar';
import styles from './Register.module.scss';
import Button from '../../hoc/Button/Button';

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
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const { username, firstName, lastName, email, password, avatarUrl } =
    registrationData;

  const handlePrevClick = () => {
    if (step === 1) return;
    setStep(s => s - 1);
  };

  const handleNextClick = () => {
    if (step === 1 && !username) {
      setErrors({ username: 'Username is required' });
      return;
    }
    if (step === 2) {
      const newErrors = {};
      if (!firstName || firstName.length < 4 || firstName.length > 32) {
        newErrors.firstName = 'First name must be between 4 and 32 characters';
      }
      if (!lastName || lastName.length < 4 || lastName.length > 32) {
        newErrors.lastName = 'Last name must be between 4 and 32 characters';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    if (step === 3 && !email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (step === 4 && !password) {
      setErrors({ password: 'Password is required' });
      return;
    }
    setErrors({});
    if (step === 5) return;
    setStep(s => s + 1);
  };

  const handleInputChange = key => e => {
    const value = e.target.value;

    setRegistrationData({
      ...registrationData,
      [key]: value,
    });

    setErrors({
      ...errors,
      [key]: '',
    });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setRegistrationData({
      ...registrationData,
      avatarUrl: file,
    });
    setAvatarPreview(URL.createObjectURL(file));
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
        throw new Error('All fields are required!');
      }

      if (
        registrationData.firstName.length < 4 ||
        registrationData.firstName.length > 32 ||
        registrationData.lastName.length < 4 ||
        registrationData.lastName.length > 32
      ) {
        throw new Error(
          'First name and last name must be between 4 and 32 characters!'
        );
      }

      await register(username, firstName, lastName, email, password, avatarUrl);
      navigate('/feed');
    } catch (error) {
      alert(`Registration error: ${error.message}`);
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
            {errors.username && (
              <p className={styles['error-text']}>{errors.username}</p>
            )}
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
              minLength="4"
              maxLength="32"
              onChange={handleInputChange('firstName')}
            />
            {errors.firstName && (
              <p className={styles['error-text']}>{errors.firstName}</p>
            )}
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
              minLength="4"
              maxLength="32"
              onChange={handleInputChange('lastName')}
            />
            {errors.lastName && (
              <p className={styles['error-text']}>{errors.lastName}</p>
            )}
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
            {errors.email && (
              <p className={styles['error-text']}>{errors.email}</p>
            )}
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
            {errors.password && (
              <p className={styles['error-text']}>{errors.password}</p>
            )}
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
            <Button style="secondary" handleClick={() => navigate('/')}>
              &times; Cancel
            </Button>
          ) : (
            <Button style="secondary" handleClick={handlePrevClick}>
              &larr; Back
            </Button>
          )}
          {step === 5 ? (
            <Button style="success" handleClick={handleRegister}>
              Register &#x2713;
            </Button>
          ) : (
            <Button style="secondary" handleClick={handleNextClick}>
              Next &rarr;
            </Button>
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
