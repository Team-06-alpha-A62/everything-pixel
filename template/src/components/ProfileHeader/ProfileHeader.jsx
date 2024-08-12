import PropTypes from 'prop-types';
import styles from './ProfileHeader.module.scss';
import Lottie from 'lottie-react';
import Avatar from 'react-avatar';
import animationData from '../../assets/avatar-loading-animation.json';

const ProfileHeader = ({ user, isLoadingAvatar }) => {
  return (
    <div className={styles['profile-header']}>
      <div className="profile-avatar">
        {isLoadingAvatar ? (
          <Lottie
            animationData={animationData}
            className={styles['lottie-animation']}
          />
        ) : (
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            round={true}
            size="100"
            src={user.avatarUrl}
          />
        )}
      </div>
      <div>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
        <p className={styles['suspended-text']}>
          {user.isBlocked ? 'Suspended' : ''}
        </p>
      </div>
      {/* <div>
        {user.isBlocked && (
          <p className={styles['suspended-text']}>Suspended</p>
        )}
      </div> */}
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.any,
  isLoadingAvatar: PropTypes.any,
};

export default ProfileHeader;
