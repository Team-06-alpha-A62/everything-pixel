import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/users.service';
import styles from './Suspended.module.scss';
import UserListItem from '../UserListItem/UserListItem';
const Suspended = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await getAllUsers();
        const transformedUsers = fetchedUsers.map(user => ({
          ...user,
          posts: Object.keys(user.posts ?? {}),
          comments: Object.keys(user.comments ?? {}),
          likedPosts: Object.keys(user.likedPosts ?? {}),
          savedPosts: Object.keys(user.savedPosts ?? {}),
          following: Object.keys(user.following ?? {}),
          followers: Object.keys(user.followers ?? {}),
          reports: {
            comments: Object.values(user.reports?.comments ?? {}),
            posts: Object.values(user.reports?.posts ?? {}),
          },
        }));
        console.log(transformedUsers);
        const filteredUsers = transformedUsers.filter(user => user.isBlocked);
        console.log(filteredUsers);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles['userList']}>
          {users.length > 0 ? (
            users.map(user => <UserListItem key={user.uid} user={user} />)
          ) : (
            <p>No users found</p>
          )}
        </div>
      )}
    </div>
  );
};

Suspended.propTypes = {};

export default Suspended;
