import Search from '../Search/Search';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Users.module.scss';
import { getAllUsers } from '../../services/users.service';
import UserListItem from '../UserListItem/UserListItem';

const Users = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await getAllUsers(searchQuery);
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
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  return (
    <div>
      <Search />
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

Users.propTypes = {};

export default Users;
