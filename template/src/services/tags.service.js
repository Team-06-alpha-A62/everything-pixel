import { get, ref, update, set } from 'firebase/database';
import { db } from '../config/firebase.config';

/**
 * Retrieves all tags from the database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of tag objects.
 * @throws {Error} If there is an error fetching tags from the database.
 */
export const getAllTags = async () => {
  try {
    const snapshot = await get(ref(db, 'tags'));
    if (!snapshot.exists()) return [];

    const tags = Object.values(snapshot.val());
    return tags;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Retrieves a tag from the database by its handle.
 *
 * @param {string} handle - The handle (name) of the tag to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the tag object, including associated posts.
 * @throws {Error} If the tag is not found or if there is an error fetching the tag.
 */
export const getTagByHandle = async handle => {
  try {
    const snapshot = await get(ref(db, `tags/${handle}`));

    if (!snapshot.exists()) {
      return new Error('Tag not found!');
    }

    return {
      ...snapshot.val(),
      posts: Object.keys(snapshot.val().posts ?? {}),
    };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Creates a new tag in the database.
 *
 * @param {string} name - The name of the tag to create.
 * @returns {Promise<void>} A promise that resolves when the tag is successfully created.
 * @throws {Error} If there is an error creating the tag in the database.
 */
export const createTag = async name => {
  try {
    const tag = { name };
    await set(ref(db, `tags/${name}`), tag);
    await update(ref(db), {
      [`tags/${name}/name`]: name,
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Adds a post to a tag in the database.
 *
 * @param {string} name - The name of the tag.
 * @param {string} postId - The ID of the post to associate with the tag.
 * @returns {Promise<void>} A promise that resolves when the post is added to the tag.
 * @throws {Error} If there is an error updating the tag with the post.
 */
export const addPostToTag = async (name, postId) => {
  const updateObject = {
    [`tags/${name}/posts/${postId}`]: true,
  };

  try {
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

/**
 * Checks if a tag exists in the database.
 *
 * @param {string} name - The name of the tag to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the tag exists, otherwise false.
 * @throws {Error} If there is an error checking the tag's existence in the database.
 */
export const tagExists = async name => {
  try {
    const snapshot = await get(ref(db, `tags/${name}`));
    return snapshot.exists();
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
