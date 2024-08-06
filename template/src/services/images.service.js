import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../config/firebase.config.js';
import { v4 as uuidv4 } from 'uuid';

const extractFilenameFromURL = url => {
  try {
    const parts = url.split('/o/');
    if (parts.length > 1) {
      const pathPart = decodeURIComponent(parts[1].split('?')[0]);
      const filename = pathPart.substring(pathPart.lastIndexOf('/') + 1);
      return filename;
    }
    throw new Error('Invalid URL format');
  } catch (error) {
    console.error('Error extracting filename from URL:', error.message);
    throw error;
  }
};

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The download URL of the uploaded image.
 */
export const uploadImage = async file => {
  if (!file) throw new Error('No file selected');

  try {
    const fileRef = storageRef(storage, `images/${uuidv4()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return url;
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadAvatar = async file => {
  if (!file) throw new Error('No file selected');

  try {
    const fileRef = storageRef(storage, `avatars/${uuidv4()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return url;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteImage = async url => {
  try {
    const fileName = extractFilenameFromURL(url);
    const desertRef = storageRef(storage, `images/${fileName}`);
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAvatar = async url => {
  try {
    const fileName = extractFilenameFromURL(url);
    const desertRef = storageRef(storage, `avatars/${fileName}`);
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error.message);
  }
};
