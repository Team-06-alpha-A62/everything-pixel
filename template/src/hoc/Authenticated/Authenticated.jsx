import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth.js';

const Authenticated = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  setTimeout(() => {
    if (!currentUser.user) {
      return <Navigate replace to="/login" state={{ from: location }} />;
    }
  }, 200);

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.any,
};

export default Authenticated;
