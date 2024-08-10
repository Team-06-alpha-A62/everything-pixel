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
import { uploadAvatar } from './images.service.js';

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
      savedPosts: snapshot.val().savedPosts
        ? Object.keys(snapshot.val().savedPosts)
        : [],
      following: snapshot.val().following
        ? Object.keys(snapshot.val().following)
        : [],
      followers: snapshot.val().followers
        ? Object.keys(snapshot.val().followers)
        : [],
      reports: {
        comments: Object.values(snapshot.val().reports?.comments ?? {}),
        posts: Object.values(snapshot.val().reports?.posts ?? {}),
      },
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
 * @param {string} avatarUrl - The URL reference of the users avatar inside the database
 * @returns {Promise<void>} A promise that resolves when the user is created.
 * @throws {Error} If there is an error creating the user in the database.
 */
export const createUser = async (
  username,
  uid,
  email,
  firstName,
  lastName,
  imageFile = '',
  role = 'user',
  isBlocked = false
) => {
  const avatarUrl = await uploadAvatar(imageFile);

  const user = {
    username,
    uid,
    firstName,
    lastName,
    email,
    avatarUrl,
    role,
    isBlocked,
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

/**
 * Updates the vote interaction of a user with a post.
 *
 * @param {string} type - The type of vote ('upVote' or 'downVote').
 * @param {string} postId - The ID of the post being voted on.
 * @param {string} userHandle - The user handle of the voter.
 * @returns {Promise<void>} A promise that resolves when the vote interaction is successfully updated.
 * @throws {Error} If there is an error updating the vote interaction in the database.
 */
export const userVoteInteractionWithPost = async (type, postId, userHandle) => {
  try {
    const updateObject = {
      [`users/${userHandle}/votes/${postId}`]: type,
      [`posts/${postId}/votes/${userHandle}`]: type,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error trying to vote post: ${error.message}`);
  }
};

/**
 * Updates the vote interaction of a user with a comment.
 *
 * @param {string} type - The type of vote ('upVote' or 'downVote').
 * @param {string} commentId - The ID of the comment being voted on.
 * @param {string} userHandle - The user handle of the voter.
 * @returns {Promise<void>} A promise that resolves when the vote interaction is successfully updated.
 * @throws {Error} If there is an error updating the vote interaction in the database.
 */
export const userVoteInteractionWithComment = async (
  type,
  commentId,
  userHandle
) => {
  try {
    const updateObject = {
      [`users/${userHandle}/comments/${commentId}`]: type,
      [`comments/${commentId}/votes/${userHandle}`]: type,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error trying to vote comment: ${error.message}`);
  }
};

/**
 * Saves a post to the user's saved posts.
 *
 * @param {string} userHandle - The user handle of the user saving the post.
 * @param {string} postId - The ID of the post to save.
 * @returns {Promise<void>} A promise that resolves when the post is successfully saved.
 * @throws {Error} If there is an error saving the post to the database.
 */
export const savePost = async (userHandle, postId) => {
  try {
    const updateObject = {
      [`users/${userHandle}/savedPosts/${postId}`]: true,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error trying to save post: ${error.message}`);
  }
};

/**
 * Removes a post from the user's saved posts.
 *
 * @param {string} userHandle - The user handle of the user removing the saved post.
 * @param {string} postId - The ID of the post to remove.
 * @returns {Promise<void>} A promise that resolves when the post is successfully removed from saved posts.
 * @throws {Error} If there is an error removing the saved post from the database.
 */
export const unSavePost = async (userHandle, postId) => {
  try {
    const updateObject = {
      [`users/${userHandle}/savedPosts/${postId}`]: null,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error trying to remove saved post: ${error.message}`);
  }
};

/**
 * Follows a user by updating the follower/following relationship in the database.
 *
 * @param {string} userHandler - The user handle of the user who wants to follow.
 * @param {string} userToFollowHandler - The user handle of the user to be followed.
 * @returns {Promise<void>} A promise that resolves when the follow relationship is successfully updated.
 * @throws {Error} If there is an error updating the follow relationship in the database.
 */
export const followUser = async (userHandler, userToFollowHandler) => {
  try {
    const updateObject = {
      [`users/${userHandler}/following/${userToFollowHandler}`]: true,
      [`users/${userToFollowHandler}/followers/${userHandler}`]: true,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error trying to follow user: ${error.message}`);
  }
};

/**
 * Unfollows a user by removing the follower/following relationship in the database.
 *
 * @param {string} userHandler - The user handle of the user who wants to unfollow.
 * @param {string} userToFollowHandler - The user handle of the user to be unfollowed.
 * @returns {Promise<void>} A promise that resolves when the unfollow relationship is successfully updated.
 * @throws {Error} If there is an error updating the unfollow relationship in the database.
 */
export const unfollowUser = async (userHandler, userToFollowHandler) => {
  try {
    const updateObject = {
      [`users/${userHandler}/following/${userToFollowHandler}`]: null,
      [`users/${userToFollowHandler}/followers/${userHandler}`]: null,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error trying to unfollow user: ${error.message}`);
  }
};

/**
 * Checks if a post is saved by a specific user.
 *
 * @param {string} userHandle - The username or handle of the user.
 * @param {string} postId - The ID of the post to check.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the post is saved.
 */
export const isPostSaved = async (userHandle, postId) => {
  try {
    const snapshot = await get(
      ref(db, `users/${userHandle}/savedPosts/${postId}`)
    );

    return snapshot.exists();
  } catch (error) {
    console.error('Error checking if post is saved:', error);
    return false;
  }
};

/**
 * Checks if a user is followed by a specific user.
 *
 * @param {string} userHandle - The username or handle of the user.
 * @param {string} postId - The username of the userToCHeck.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the post is saved.
 */
export const isUserFollowed = async (userHandle, userToCheck) => {
  try {
    const snapshot = await get(
      ref(db, `users/${userHandle}/following/${userToCheck}`)
    );

    return snapshot.exists();
  } catch (error) {
    throw new Error(`Error checking if user is followed ${error.message}`);
  }
};

/**
 * Retrieves all users that the specified user is following.
 *
 * @param {string} userHandle - The username or handle of the user.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of user handles.
 */
export const getAllFollowingUsers = async userHandle => {
  try {
    const snapshot = await get(ref(db, `users/${userHandle}/following`));

    if (!snapshot.exists()) return [];

    return Object.keys(snapshot.val());
  } catch (error) {
    throw new Error(
      `Error fetching following users for ${userHandle}: ${error.message}`
    );
  }
};

/**
 * Retrieves all followers of the specified user.
 *
 * @param {string} userHandle - The username or handle of the user.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of user handles.
 */
export const getAllFollowers = async userHandle => {
  try {
    const snapshot = await get(ref(db, `users/${userHandle}/followers`));

    if (!snapshot.exists()) return [];

    return Object.keys(snapshot.val());
  } catch (error) {
    throw new Error(
      `Error fetching followers for ${userHandle}: ${error.message}`
    );
  }
};

/**
 * Retrieves all followers of the specified user.
 *
 * @param {string} userHandle - The username or handle of the user.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of user handles.
 */
export const getAllSavedPosts = async userHandle => {
  try {
    const snapshot = await get(ref(db, `users/${userHandle}/savedPosts`));

    if (!snapshot.exists()) return [];

    return Object.keys(snapshot.val());
  } catch (error) {
    throw new Error(
      `Error fetching saved posts for ${userHandle}: ${error.message}`
    );
  }
};
