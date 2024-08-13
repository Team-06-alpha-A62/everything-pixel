import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/useAuth';
import styles from './Notifications.module.scss';
import {
  getAllNotificationsByUserHandle,
  markNotificationAsRead,
} from '../../services/notification.service';

import Notification from '../Notification/Notification';

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!currentUser?.userData?.username) return;

    const fetchNotifications = async () => {
      try {
        const notificationsData = await getAllNotificationsByUserHandle(
          currentUser.userData.username
        );

        const unreadNotifications = Object.values(notificationsData)
          .filter(notification => !notification.isRead)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date, newest first

        setNotifications(unreadNotifications);

        await Promise.all(
          unreadNotifications.map(notification =>
            markNotificationAsRead(
              currentUser.userData.username,
              notification.id
            )
          )
        );
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
      }
    };

    fetchNotifications();
  }, [currentUser?.userData?.username]);

  return (
    <div className={styles['notifications-list']}>
      <h2>My Notifications</h2>
      {notifications.length === 0 ? (
        <p className={styles['no-data-message']}>No new notifications</p>
      ) : (
        notifications.map(notification => (
          <Notification key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
};

Notifications.propTypes = {
  currentUser: PropTypes.object,
};

export default Notifications;
