import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../config/firebase.config.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The download URL of the uploaded image.
 */
export const uploadImage = async file => {
  if (!file) return null;

  const fileRef = storageRef(storage, `images/${uuidv4()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
};

export const uploadAvatar = async file => {
  if (!file) return null;
  console.log(file);
  const fileRef = storageRef(storage, `avatars/${uuidv4()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
};