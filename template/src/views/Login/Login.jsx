import { useState } from 'react';
import { useAuth } from '../../providers/useAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Button from '../../hoc/Button/Button.jsx';

const Login = () => {
  const { currentUser } = useAuth();

  const initialLoginData = {
    email: '',
    password: '',
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  if (currentUser.user) {
    navigate('/feed');
  }

  const handleInputChange = key => e => {
    setLoginData({
      ...loginData,
      [key]: e.target.value,
    });

    // Clear errors as user types
    setErrors({
      ...errors,
      [key]: '',
    });
  };

  const handleLogin = async () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      navigate('/feed');
    } catch (error) {
      alert(`Login error: ${error.message}`);
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-container']}>
        <h1 className={styles['login-title']}>Welcome to ∀ PXL</h1>
        <label htmlFor="email" className={styles['login-label']}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles['login-input']}
          value={loginData.email}
          onChange={handleInputChange('email')}
        />
        {errors.email && <p className={styles['error-text']}>{errors.email}</p>}
        <label htmlFor="password" className={styles['login-label']}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={styles['login-input']}
          value={loginData.password}
          onChange={handleInputChange('password')}
        />
        {errors.password && (
          <p className={styles['error-text']}>{errors.password}</p>
        )}
        <div className={styles['button-container']}>
          <Button style="secondary" handleClick={() => navigate('/')}>
            &times; Cancel
          </Button>
          <Button style="success" handleClick={handleLogin}>
            Login &#x2713;
          </Button>
        </div>
        <p className={styles['login-register-text']}>
          Don&apos;t have an account yet?{' '}
          <Link to="/register" className={styles['login-register-link']}>
            Register
          </Link>{' '}
          here
        </p>
      </div>
    </div>
  );
};

export default Login;
