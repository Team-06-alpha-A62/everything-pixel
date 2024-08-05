import { get, push, ref, update } from 'firebase/database';
import { db } from '../config/firebase.config';
import { uploadImage } from './images.service.js';
import { formatDistanceToNow } from 'date-fns';

/**
 * Retrieves all posts from the database, optionally filtering by a search term.
 *
 * @param {string} [search=''] - The search term to filter posts by title.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects.
 * @throws {Error} If there is an error fetching posts from the database.
 */
export const getAllPosts = async (search = '') => {
  try {
    const snapshot = await get(ref(db, 'posts'));

    if (!snapshot.exists()) return [];

    const posts = Object.values(snapshot.val());

    if (search) {
      return posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return posts;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Retrieves a post from the database by its handle.
 *
 * @param {string} handle - The handle of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the post object, including tags, comments, and votes.
 * @throws {Error} If the post is not found or if there is an error fetching the post.
 */
export const getPostByHandle = async handle => {
  try {
    const snapshot = await get(ref(db, `posts/${handle}`));

    if (!snapshot.exists()) {
      throw new Error('Post not found!');
    }

    return {
      ...snapshot.val(),
      tags: Object.keys(snapshot.val().tags ?? {}),
      comments: Object.keys(snapshot.val().comments ?? {}),
      upVotedBy: Object.values(snapshot.val().votes ?? {}).filter(
        vote => vote === 'upVoted'
      ),
      downVotedBy: Object.values(snapshot.val().votes ?? {}).filter(
        vote => vote === 'downVoted'
      ),
      createdOn: formatDistanceToNow(new Date(snapshot.val().createdOn), {
        addSuffix: true,
      })
    };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Creates a new post in the database.
 *
 * @param {string} author - The author of the post.
 * @param {string} title - The title of the post.
 * @param {string} content - The content of the post.
 * @param {Array<string>} tags - An array of tags associated with the post.
 * @param {string} imageFile - the URL reference of the posts image inside the database
 * @returns {Promise<Object>} A promise that resolves to the newly created post's database reference.
 * @throws {Error} If there is an error creating the post in the database.
 */
export const createPost = async (
  author,
  title,
  content,
  tags,
  imageFile = ''
) => {
  try {
    const imageUrl = await uploadImage(imageFile);

    const post = {
      author,
      title,
      content,
      tags,
      createdOn: Date.now(),
      image: imageUrl,
    };
    const result = await push(ref(db, 'posts'), post);
    const id = result.key;

    await update(ref(db), {
      [`posts/${id}/id`]: id,
    });

    return result;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Updates a specific detail of a post in the database.
 *
 * @param {string} handle - The handle of the post to update.
 * @param {string} target - The field of the post to update.
 * @param {any} value - The new value for the specified field.
 * @returns {Promise<void>} A promise that resolves when the post detail is updated.
 * @throws {Error} If there is an error updating the post detail in the database.
 */
export const updatePostDetails = async (handle, target, value) => {
  try {
    const updateObject = {
      [`posts/${handle}/${target}`]: value,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Deletes a post from the database, along with its references in tags and user's posts.
 *
 * @param {string} userHandle - The handle of the user who owns the post.
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<void>} A promise that resolves when the post and its references are deleted.
 * @throws {Error} If there is an error deleting the post from the database.
 */
export const deletePost = async (userHandle, postId) => {
  try {
    const postSnapshot = await get(ref(db, `posts/${postId}`));

    if (!postSnapshot.exists()) {
      throw new Error('Post not found!');
    }

    const tags = Object.keys(postSnapshot.val().tags ?? {});

    const tagsUpdateObject = tags.reduce((acc, tag) => {
      acc[`tags/${tag}/posts/${postId}`] = null;
      return acc;
    }, {});

    const updateObject = {
      [`users/${userHandle}/posts/${postId}`]: null,
      [`posts/${postId}`]: null,
      ...tagsUpdateObject,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Checks if a user has voted on a post.
 *
 * @param {string} userHandler - The handler of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user's vote data, or null if no vote exists.
 * @throws {Error} If there is an error checking the vote in the database.
 */
export const hasUserVotedPost = async (userHandler, postId) => {
  try {
    const snapshot = await get(ref(db, `posts/${postId}/votes/${userHandler}`));
    if (!snapshot.exists()) return null;

    return snapshot.val();
  } catch (error) {
    throw new Error(`Error checking vote: ${error.message}`);
  }
};
