import PropTypes from 'prop-types';
import styles from './ProfileInfo.module.scss';
import { useEffect, useState } from 'react';

const ProfileInfo = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    ...user,
  });

  useEffect(() => {
    setUserInfo({ ...user });
  }, [user]);

  return (
    <div className={styles['profile-info-container']}>
      <div className={styles['info-grid']}>
        <h2 className={styles['info-heading']}>General Info</h2>
        <div>
          <h3>Username</h3>
          <span>{user.username}</span>
        </div>
        <div>
          <h3>First name</h3>
          <span>{user.firstName}</span>
        </div>
        <div>
          <h3>Last name</h3>
          <span>{user.lastName}</span>
        </div>
        <div>
          <h3>Bio</h3>
          <span>{user.bio || 'N/A'}</span>
        </div>
        <h2 className={styles['info-heading']}>Contact Info</h2>
        <div>
          <h3>Email address</h3>
          <span>{user.email}</span>
        </div>
        <div>
          <h3>Phone number</h3>
          <span>{user.number || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired, // Use object as type
};

export default ProfileInfo;
