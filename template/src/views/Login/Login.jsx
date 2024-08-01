import { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const initialLoginData = {
    email: '',
    password: '',
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = key => e => {
    setLoginData({
      ...loginData,
      [key]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      return alert('No credentials provided!');
    }

    try {
      await login(loginData.email, loginData.password);
      navigate('/app');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Welcome to ∀ PXL</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={loginData.email}
        onChange={handleInputChange('email')}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={loginData.password}
        onChange={handleInputChange('password')}
      />
      <br />
      <br />
      <button onClick={() => navigate('/')}>&times; Cancel</button>
      <button onClick={handleLogin}>Login &#x2713;</button>
      <p>
        Don&apos;t have an account yet? <Link to="/register">Register</Link>{' '}
        here
      </p>
    </>
  );
};

export default Login;
