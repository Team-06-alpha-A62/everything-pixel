import { get, ref, update } from 'firebase/database';
import { db } from '../config/firebase.config';

export const getAllReports = async () => {
  try {
    const snapshot = await get(ref(db, 'reports'));

    if (!snapshot.exists()) return [];

    const reports = snapshot.val();
    const postReportsArray = Object.entries(reports.postReports || {}).map(
      ([id, type]) => ({ id, type })
    );
    const commentReportsArray = Object.entries(
      reports.commentReports || {}
    ).map(([id, type]) => ({ id, type }));

    return [postReportsArray, commentReportsArray];
  } catch (error) {
    throw new Error(`Failed to retrieve reports: ${error.message}`);
  }
};

export const createCommentReport = async (commentId, type, userHandle) => {
  try {
    const updateObject = {
      [`reports/reports/${commentId}/${userHandle}`]: type,
      [`posts/post/${commentId}/reports/${userHandle}`]: type,
      [`users/${userHandle}/reports/comments/${commentId}`]: type,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to create comment report: ${error.message}`);
  }
};
export const createPostReport = async (postId, type, userHandle) => {
  try {
    const updateObject = {
      [`reports/reports/${postId}/${userHandle}`]: type,
      [`posts/${postId}/reports/${userHandle}`]: type,
      [`users/${userHandle}/reports/posts/${postId}`]: type,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to create comment report: ${error.message}`);
  }
};

export const deletePostReport = async postId => {
  try {
    const updateObject = {
      [`reports/postReports/${postId}`]: null,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to create comment report: ${error.message}`);
  }
};

export const deleteCommentReport = async commentId => {
  try {
    const updateObject = {
      [`reports/commentReports/${commentId}`]: null,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to create comment report: ${error.message}`);
  }
};
