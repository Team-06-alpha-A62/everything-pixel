import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useEffect } from 'react';

const Authenticated = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.userData) {
      navigate('/login');
    }
  }, [currentUser?.userData]);

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.any,
};

export default Authenticated;
