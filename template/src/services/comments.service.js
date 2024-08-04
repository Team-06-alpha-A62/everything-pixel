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
    const comment = { postId, author, content, edited, createdOn: Date.now() };

    const result = await push(ref(db, 'comments'), comment);
    const commentId = result.key;

    await update(ref(db), { [`comments/${commentId}/id`]: commentId });
    return result;
  } catch (error) {
    throw new Error(`Error creating comment: ${error.message}`);
  }
};

/**
 * Checks if a user has voted on a comment.
 *
 * @param {string} userHandler - The handler of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user's vote data, or null if no vote exists.
 * @throws {Error} If there is an error checking the vote in the database.
 */
export const hasUserVotedComment = async userHandler => {
  try {
    const snapshot = await get(ref(db, `comments/votes/${userHandler}`));
    if (!snapshot.exists()) return null;

    return snapshot.val();
  } catch (error) {
    console.error('Error checking vote:', error.message);
    return null;
  }
};

/**
 * Deletes a comment from the database.
 *
 * @param {string} commentId - The ID of the comment to delete.
 * @returns {Promise<void>} A promise that resolves when the comment is deleted.
 * @throws {Error} If there is an error deleting the comment from the database.
 */
export const deleteComment = async commentId => {
  try {
    // Construct the reference to the comment in the "comments" table
    const commentRef = ref(db, `comments/${commentId}`);

    // Remove the comment
    await remove(commentRef);

    console.log(`Comment ${commentId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};
