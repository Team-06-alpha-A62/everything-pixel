import { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss'; // Import the SCSS file

const Login = () => {
  const { currentUser } = useAuth();

  const initialLoginData = {
    email: '',
    password: '',
  };

  const [loginData, setLoginData] = useState(initialLoginData);
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
  };

  const handleLogin = async () => {
    try {
      if (!loginData.email || !loginData.password) {
        throw new Error('No credentials provided!');
      }

      await login(loginData.email, loginData.password);
      navigate('/feed');
    } catch (error) {
      alert(`login error: ${error.message}`);
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
        <div className={styles['button-container']}>
          <button
            className={`${styles['login-button']} ${styles['cancel']}`}
            onClick={() => navigate('/')}
          >
            &times; Cancel
          </button>
          <button
            className={`${styles['login-button']} ${styles['submit']}`}
            onClick={handleLogin}
          >
            Login &#x2713;
          </button>
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
