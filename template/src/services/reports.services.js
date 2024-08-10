import { get, ref, update } from 'firebase/database';
import { db } from '../config/firebase.config';

/**
 * Retrieves all reports from the database, categorizing them into post and comment reports.
 *
 * @returns {Promise<Array>} A promise that resolves to an array containing two arrays:
 * - The first array contains objects representing post reports.
 * - The second array contains objects representing comment reports.
 * @throws {Error} If there is an error retrieving reports from the database.
 */
export const getAllReports = async () => {
  try {
    const snapshot = await get(ref(db, 'reports'));

    if (!snapshot.exists()) return [];

    const reports = snapshot.val();
    const postReportsArray = Object.entries(reports.post || {}).map(
      ([id, type]) => ({ id, type })
    );
    const commentReportsArray = Object.entries(reports.comment | {}).map(
      ([id, type]) => ({ id, type })
    );

    return [postReportsArray, commentReportsArray];
  } catch (error) {
    throw new Error(`Failed to retrieve reports: ${error.message}`);
  }
};

/**
 * Creates a report for a comment, updating the relevant paths in the database.
 *
 * @param {string} commentId - The ID of the comment being reported.
 * @param {string} type - The type of report being made.
 * @param {string} userHandle - The user handle of the reporter.
 * @returns {Promise<void>} A promise that resolves when the report is successfully created.
 * @throws {Error} If there is an error creating the comment report in the database.
 */
export const createCommentReport = async (commentId, type, userHandle) => {
  try {
    const updateObject = {
      [`reports/comment/${commentId}/${userHandle}`]: type,
      [`comments/${commentId}/reports/${userHandle}`]: type,
      [`users/${userHandle}/reports/comments/${commentId}`]: type,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to create comment report: ${error.message}`);
  }
};

/**
 * Creates a report for a post, updating the relevant paths in the database.
 *
 * @param {string} postId - The ID of the post being reported.
 * @param {string} type - The type of report being made.
 * @param {string} userHandle - The user handle of the reporter.
 * @returns {Promise<void>} A promise that resolves when the report is successfully created.
 * @throws {Error} If there is an error creating the post report in the database.
 */
export const createPostReport = async (postId, type, userHandle) => {
  try {
    const updateObject = {
      [`reports/post/${postId}/${userHandle}`]: type,
      [`posts/${postId}/reports/${userHandle}`]: type,
      [`users/${userHandle}/reports/posts/${postId}`]: type,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to create post report: ${error.message}`);
  }
};

/**
 * Deletes a report for a post from the database.
 *
 * @param {string} postId - The ID of the post whose report is to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post report is successfully deleted.
 * @throws {Error} If there is an error deleting the post report from the database.
 */
export const deletePostReport = async postId => {
  try {
    const updateObject = {
      [`reports/postReports/${postId}`]: null,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to delete post report: ${error.message}`);
  }
};

/**
 * Deletes a report for a comment from the database.
 *
 * @param {string} commentId - The ID of the comment whose report is to be deleted.
 * @returns {Promise<void>} A promise that resolves when the comment report is successfully deleted.
 * @throws {Error} If there is an error deleting the comment report from the database.
 */
export const deleteCommentReport = async commentId => {
  try {
    const updateObject = {
      [`reports/commentReports/${commentId}`]: null,
    };
    await update(ref(db), updateObject);
  } catch (error) {
    throw new Error(`Failed to delete comment report: ${error.message}`);
  }
};
