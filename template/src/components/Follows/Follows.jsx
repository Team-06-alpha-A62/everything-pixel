import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import styles from './Follows.module.scss';

import { useAuth } from '../../providers/useAuth.js';
import UserListItem from '../UserListItem/UserListItem.jsx';

const Follows = ({ following, followers }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('following');
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const followingData = await Promise.all(
          following.map(f => getUserByHandle(f))
        );
        const followersData = await Promise.all(
          followers.map(f => getUserByHandle(f))
        );
        setFollowingData(followingData);
        setFollowersData(followersData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [following, followers]);

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const activeList = activeTab === 'following' ? followingData : followersData;

  return (
    <div className={styles['follows-container']}>
      <div className={styles['tabs']}>
        <span
          className={`${styles['tab']} ${
            activeTab === 'following' ? styles['active'] : ''
          }`}
          onClick={() => handleTabClick('following')}
        >
          Following
        </span>
        <span
          className={`${styles['tab']} ${
            activeTab === 'followers' ? styles['active'] : ''
          }`}
          onClick={() => handleTabClick('followers')}
        >
          Followers
        </span>
      </div>
      <div className={styles['listContainer']}>
        {activeList.map((user, index) => (
          <UserListItem key={index} user={user} showSuspendToggle={false} />
        ))}
      </div>
    </div>
  );
};

Follows.propTypes = {
  following: PropTypes.arrayOf(PropTypes.string).isRequired,
  followers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Follows;
