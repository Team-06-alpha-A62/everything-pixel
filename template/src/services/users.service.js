import {
  get,
  ref,
  update,
  orderByChild,
  equalTo,
  query,
  push,
} from 'firebase/database';
import { db } from '../config/firebase.config';

export const getAllUsers = async (search = '') => {
  try {
    const snapshot = await get(ref(db, `users`));
    if (!snapshot.exists()) return [];

    const users = Object.values(snapshot.val());

    if (search) {
      return users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    return users;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const getUserByHandle = async handle => {
  try {
    const snapshot = await get(ref(db, `users/${handle}`));
    if (!snapshot.exists()) {
      return new Error('User not found!');
    }
    return {
      ...snapshot.val(),
      posts: Object.keys(snapshot.val().posts ?? {}),
      comments: Object.keys(snapshot.val().comments ?? {}),
      likedPosts: Object.keys(snapshot.val().likedPosts ?? {}),
    };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const createUser = async (
  username,
  uid,
  email,
  firstName,
  lastName,
  role = 'user',
  isBLocked = false
) => {
  const user = {
    username,
    uid,
    firstName,
    lastName,
    email,
    role,
    isBLocked,
  };
  try {
    const result = await push(ref(db, `users/${username}`, user));
    await update(ref(db), {
      [`users/${username}/username`]: username,
    });
    return result;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const changeUserDetails = async (handle, target, value) => {
  try {
    const updateObject = {
      [`users/${handle}/${target}`]: value,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addUserPost = async (handle, postId) => {
  try {
    const updateObject = {
      [`users/${handle}/posts/${postId}`]: true,
    };

    await update(ref(db), updateObject);
    return true;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const getUserData = async uid => {
  try {
    const userQuery = query(
      ref(db, 'users'),
      orderByChild('uid'),
      equalTo(uid)
    );
    const snapshot = await get(userQuery);
    if (!snapshot.exists()) {
      throw new Error(`No data found for UID: ${uid}`);
    }
    const data = snapshot.val();
    const userData = data[Object.keys(data)[0]];

    return userData;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
