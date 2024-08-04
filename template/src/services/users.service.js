import {
  get,
  ref,
  update,
  orderByChild,
  equalTo,
  query,
  set,
} from 'firebase/database';
import { db } from '../config/firebase.config';

/**
 * Retrieves all users from the database. Optionally filters users by a search term.
 *
 * @param {string} [search=''] - The search term to filter users by username.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 * @throws {Error} If there is an error fetching users from the database.
 */
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

/**
 * Retrieves a user from the database by their handle.
 *
 * @param {string} handle - The handle of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object including posts, comments, and likedPosts keys.
 * @throws {Error} If there is an error fetching the user from the database or if the user is not found.
 */
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

/**
 * Creates a new user in the database.
 *
 * @param {string} username - The username of the new user.
 * @param {string} uid - The unique identifier for the new user.
 * @param {string} email - The email address of the new user.
 * @param {string} firstName - The first name of the new user.
 * @param {string} lastName - The last name of the new user.
 * @param {string} [role='user'] - The role of the new user, defaults to 'user'.
 * @param {boolean} [isBLocked=false] - The blocked status of the new user, defaults to false.
 * @returns {Promise<void>} A promise that resolves when the user is created.
 * @throws {Error} If there is an error creating the user in the database.
 */
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
    await set(ref(db, `users/${username}`), user);
    await update(ref(db), {
      [`users/${username}/username`]: username,
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Updates a specific detail of a user in the database.
 *
 * @param {string} handle - The handle of the user to update.
 * @param {string} target - The field of the user to update.
 * @param {any} value - The new value for the specified field.
 * @returns {Promise<void>} A promise that resolves when the user detail is updated.
 * @throws {Error} If there is an error updating the user detail in the database.
 */
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

/**
 * Adds a post to a user's list of posts.
 *
 * @param {string} handle - The handle of the user.
 * @param {string} postId - The ID of the post to add.
 * @returns {Promise<boolean>} A promise that resolves to true if the post is added successfully.
 * @throws {Error} If there is an error adding the post to the user's list.
 */
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

/**
 * Retrieves a user by their UID.
 *
 * @param {string} uid - The unique identifier of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data object.
 * @throws {Error} If there is an error fetching the user data.
 */
export const getUserData = async uid => {
  try {
    const snapshot = await get(
      query(ref(db, 'users'), orderByChild('uid'), equalTo(uid))
    );
    if (!snapshot.exists()) {
      return new Error('User not found!');
    }
    return snapshot.val();
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const userVoteInteractionWithPost = async (type, postId, userHandle) => {
  try {
    const updateObject = {
      [`users/${userHandle}/votes/${postId}`]: type,
      [`posts/${postId}/votes/${userHandle}`]: type,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`error trying to vote post : ${error.message}`);
  }
};
