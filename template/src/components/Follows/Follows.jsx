import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import styles from './Follows.module.scss';
import Avatar from 'react-avatar';

const Follows = ({ following, followers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('following');
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [following, followers]);

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const activeList = activeTab === 'following' ? followingData : followersData;
  const noDataMessage =
    activeTab === 'following'
      ? 'You are not following anyone yet.'
      : 'No one is following you yet.';

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
        {isLoading ? (
          <div className={styles['loading']}>Loading...</div>
        ) : activeList.length === 0 ? (
          <div className={styles['noData']}>{noDataMessage}</div>
        ) : (
          activeList.map((user, index) => (
            <div key={index} className={styles['userItem']}>
              <Avatar
                name={`${user.firstName} ${user.lastName}`}
                round={true}
                size="50"
                src={user.avatarUrl}
              />
              <span>{user.username}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Follows.propTypes = {
  following: PropTypes.arrayOf(PropTypes.string).isRequired,
  followers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Follows;
