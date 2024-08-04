import { get, ref, remove, set, update } from 'firebase/database';
import { db } from '../config/firebase.config';

export const getAllComments = async () => {
  try {
    const snapshot = await get(ref(db, 'posts'));
    if (!snapshot.exists) return [];
    const comments = Object.values(snapshot.val());
    return comments;
  } catch (error) {
    throw new Error(
      `Error fetching all comments from database: ${error.message}`
    );
  }
};

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
      `error fethcing comment by id from database: ${error.message}`
    );
  }
};

export const createComment = async (
  postId,
  author,
  content,
  edited = false
) => {
  try {
    const comment = { postId, author, content, edited, createdOn: Date.now() };

    const result = await set(ref(db, 'comments'), comment);
    const commentId = result.key;

    update(ref(db), { [`comments/${commentId}/id`]: commentId });
    return result;
  } catch (error) {
    throw new Error(`error creating comment ${error.message}`);
  }
};

export const hasUserVotedComment = async userHandler => {
  try {
    const snapshot = await get(ref(db, `posts/votes/${userHandler}`));
    if (!snapshot.exists()) return null;

    return snapshot.val();
  } catch (error) {
    console.error('Error checking vote:', error);
  }
};
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
