import { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';

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

  //validations will be in helper finctions in future
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
