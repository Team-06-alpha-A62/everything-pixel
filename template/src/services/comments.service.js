import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config/firebase.config';

/**
 * Retrieves all comments from the database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of comment objects.
 * @throws {Error} If there is an error fetching comments from the database.
 */
export const getAllComments = async () => {
  try {
    const snapshot = await get(ref(db, 'comments'));
    if (!snapshot.exists()) return [];

    const comments = Object.values(snapshot.val());
    return comments;
  } catch (error) {
    throw new Error(
      `Error fetching all comments from database: ${error.message}`
    );
  }
};

/**
 * Retrieves a comment from the database by its ID.
 *
 * @param {string} commentId - The ID of the comment to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the comment object, including upvotes and downvotes.
 * @throws {Error} If the comment does not exist or if there is an error fetching the comment.
 */
export const getCommentById = async commentId => {
  try {
    const snapshot = await get(ref(db, `comments/${commentId}`));

    if (!snapshot.exists()) throw new Error('Comment does not exist');

    return {
      ...snapshot.val(),
      upVotedBy: Object.values(snapshot.val().votes ?? {}).filter(
        vote => vote === 'upVoted'
      ),
      downVotedBy: Object.values(snapshot.val().votes ?? {}).filter(
        vote => vote === 'downVoted'
      ),
    };
  } catch (error) {
    throw new Error(
      `Error fetching comment by ID from database: ${error.message}`
    );
  }
};

/**
 * Creates a new comment in the database.
 *
 * @param {string} postId - The ID of the post the comment is associated with.
 * @param {string} author - The author of the comment.
 * @param {string} content - The content of the comment.
 * @param {boolean} [edited=false] - Indicates if the comment has been edited, defaults to false.
 * @returns {Promise<Object>} A promise that resolves to the newly created comment's database reference.
 * @throws {Error} If there is an error creating the comment in the database.
 */
export const createComment = async (
  postId,
  author,
  content,
  edited = false
) => {
  try {
    const comment = {
      postId,
      author,
      content,
      edited,
      createdOn: Date.now(),
    };

    const result = await push(ref(db, 'comments'), comment);
    const commentId = result.key;

    await update(ref(db), {
      [`comments/${commentId}/id`]: commentId,
      [`posts/${postId}/comments/${commentId}`]: true,
      [`users/${author}/comments/${commentId}`]: content,
    });
    return result;
  } catch (error) {
    throw new Error(`Error creating comment: ${error.message}`);
  }
};

/**
 * Edits the content of a comment in the database.
 *
 * @param {string} commentId - The ID of the comment to edit.
 * @param {string} newContent - The new content for the comment.
 * @returns {Promise<void>} A promise that resolves when the comment is updated.
 * @throws {Error} If there is an error updating the comment content.
 */
export const editCommentContent = async (commentId, newContent, userHandle) => {
  try {
    const updateObject = {
      [`comments/${commentId}/content`]: newContent,
      [`comments/${commentId}/edited`]: Date.now(),
      [`users/${userHandle}/comments/${commentId}`]: newContent,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error editing comment content: ${error.message}`);
  }
};

/**
 * Deletes a comment from the database.
 *
 * @param {string} commentId - The ID of the comment to delete.
 * @param {string} postId - The ID of the post the comment is associated with.
 * @returns {Promise<void>} A promise that resolves when the comment is deleted.
 * @throws {Error} If there is an error deleting the comment from the database.
 */
export const deleteComment = async (commentId, postId, userHandle) => {
  try {
    const commentRef = ref(db, `comments/${commentId}`);
    const postCommentRef = ref(db, `posts/${postId}/comments/${commentId}`);
    const userCommentRef = ref(db, `users/${userHandle}/comments/${commentId}`);
    await remove(commentRef);
    await remove(postCommentRef);
    await remove(userCommentRef);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

/**
 * Likes a comment in the database.
 *
 * @param {string} userHandle - The handle of the user liking the comment.
 * @param {string} commentId - The ID of the comment to like.
 * @returns {Promise<void>} A promise that resolves when the comment is liked.
 * @throws {Error} If there is an error liking the comment in the database.
 */
export const likeComment = async (userHandle, commentId) => {
  try {
    console.log(commentId, userHandle);
    const updateObject = {
      [`comments/${commentId}/likes/${userHandle}`]: true,
      [`users/${userHandle}/likedComments/${commentId}`]: true,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error liking comment: ${error.message}`);
  }
};

/**
 * Dislikes a comment in the database.
 *
 * @param {string} userHandle - The handle of the user disliking the comment.
 * @param {string} commentId - The ID of the comment to dislike.
 * @returns {Promise<void>} A promise that resolves when the comment is disliked.
 * @throws {Error} If there is an error disliking the comment in the database.
 */
export const dislikeComment = async (userHandle, commentId) => {
  try {
    const updateObject = {
      [`comments/${commentId}/likes/${userHandle}`]: null,
      [`users/${userHandle}/likedComments/${commentId}`]: null,
    };

    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Error disliking comment: ${error.message}`);
  }
};

/**
 * Checks if a user has voted on a comment.
 *
 * @param {string} userHandle - The handle of the user to check.
 * @param {string} commentId - The ID of the comment to check.
 * @returns {Promise<string|null>} A promise that resolves to the vote type ('upVoted' or 'downVoted') or null if no vote exists.
 * @throws {Error} If there is an error checking the vote in the database.
 */
export const hasUserVotedComment = async (userHandle, commentId) => {
  try {
    const snapshot = await get(
      ref(db, `comments/${commentId}/votes/${userHandle}`)
    );
    if (!snapshot.exists()) return null;

    return snapshot.val();
  } catch (error) {
    throw new Error(`Error checking vote: ${error.message}`);
  }
};
