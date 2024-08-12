import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileHeader.module.scss';
import Lottie from 'lottie-react';
import Avatar from 'react-avatar';
import animationData from '../../assets/avatar-loading-animation.json';
import { listenToUserBlockedStatus } from '../../services/users.service';

const ProfileHeader = ({ user, isLoadingAvatar }) => {
  const [isCurrentUserBlocked, setIsCurrentUserBlocked] = useState(
    user.isBlocked
  );

  useEffect(() => {
    let unsubscribe;

    if (user && user.username) {
      unsubscribe = listenToUserBlockedStatus(
        user.username,
        setIsCurrentUserBlocked
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

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
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <p>{user.email}</p>
        <p className={styles['suspended-text']}>
          {isCurrentUserBlocked ? 'Suspended' : ''}
        </p>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  isLoadingAvatar: PropTypes.bool.isRequired,
};

export default ProfileHeader;
