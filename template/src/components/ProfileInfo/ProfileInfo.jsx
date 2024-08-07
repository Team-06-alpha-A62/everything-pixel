import PropTypes from 'prop-types';
import styles from './ProfileInfo.module.scss';

const ProfileInfo = ({ user }) => {
  return (
    <div className={styles['profile-info-container']}>
      <div className={styles['info-grid']}>
        <h1 className={styles['info-heading']}>General Info</h1>
        <div>
          <h3>Username</h3>
          <p>{user.username}</p>
        </div>
        <div>
          <h3>First name</h3>
          <p>{user.firstName}</p>
        </div>
        <div>
          <h3>Last name</h3>
          <p>{user.lastName}</p>
        </div>
        <div>
          <h3>Bio</h3>
          <p>{user.bio || 'N/A'}</p>
        </div>
        <h1 className={styles['info-heading']}>Contact Info</h1>
        <div>
          <h3>Email address</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Phone number</h3>
          <p>{user.number || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired, // Use object as type
};

export default ProfileInfo;
