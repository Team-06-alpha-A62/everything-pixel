import { get, onValue, push, ref, remove, update } from 'firebase/database';
import { db } from '../config/firebase.config';

/**
 * Add a new notification
 * @param {string} userId - The ID of the user to notify
 * @param {object} notificationData - The details of the notification
 */
export const createNotification = async (userHandle, notificationData) => {
  try {
    const newNotification = {
      userHandle,
      ...notificationData,
      isRead: false,
      createdAt: Date.now(),
    };
    const result = await push(
      ref(db, `notifications/${userHandle}`),
      newNotification
    );
    const id = result.key;

    const updateObject = {
      [`notifications/${userHandle}/${id}/id`]: id,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error creating notification: ${error.message}`);
  }
};

export const getAllNotificationsByUserHandle = async userHandle => {
  const snapshot = await get(ref(db, `notifications/${userHandle}`));
  if (!snapshot.exists) return [];

  return snapshot.val();
};

export const markNotificationAsRead = async (userHandle, notificationId) => {
  const updateObject = {
    [`notifications/${userHandle}/${notificationId}/isRead`]: true,
  };

  await update(ref(db), updateObject);
};

export const deleteNotification = async (userHandle, notificationId) => {
  const notificationReference = ref(
    db,
    `notifications/${userHandle}/${notificationId}`
  );
  await remove(notificationReference);
};

export const listenToNotifications = (userHandle, onUpdate) => {
  const notificationsRef = ref(db, `notifications/${userHandle}`);
  onValue(notificationsRef, snapshot => {
    const notifications = snapshot.val();
    onUpdate(notifications);
  });
};
