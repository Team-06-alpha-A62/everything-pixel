import {
  get,
  set,
  ref,
  update,
  orderByChild,
  equalTo,
} from 'firebase/database';
import { db } from '../config/firebase.config';

export const getAllUsers = async (search = '') => {
  const snapshot = await get(ref(db, `users`));
  if (!snapshot.exists()) return [];

  const users = Object.values(snapshot.val());

  if (search) {
    return users.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  return users;
};

export const getUserByHandle = async handle => {
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
  await set(ref(db, `users/${username}`), user);
  await update(ref(db), {
    [`users/${username}/username`]: username,
  });
};

export const changeUserDetails = (handle, target, value) => {
  const updateObject = {
    [`users/${handle}/${target}`]: value,
  };
  return update(ref(db, updateObject));
};

export const getUserData = async uid => {
  const snapshot = await get(
    ref(db, `users`),
    orderByChild('uid'),
    equalTo(uid)
  );
  const data = snapshot.val();
  const userData = data[Object.keys(data)[0]];
  return userData;
};
