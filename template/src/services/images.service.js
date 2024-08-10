import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../config/firebase.config.js';
import { v4 as uuidv4 } from 'uuid';

import invader1 from '../assets/invader-1.png';
import invader2 from '../assets/invader-2.png';
import invader3 from '../assets/invader-3.png';


/**
 * Extracts the filename from a Firebase Storage URL.
 *
 * @param {string} url - The Firebase Storage URL from which to extract the filename.
 * @returns {string} The extracted filename.
 * @throws {Error} If the URL format is invalid or extraction fails.
 */
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

const getRandomInvaderImage = async () => {
  const invaderImages = [
    { name: 'invader-1.png', path: invader1 },
    { name: 'invader-2.png', path: invader2 },
    { name: 'invader-3.png', path: invader3 },
  ];

  const randomIndex = Math.floor(Math.random() * invaderImages.length);
  console.log(randomIndex);
  const selectedImage = invaderImages[randomIndex];

  const response = await fetch(selectedImage.path);
  const blob = await response.blob();

  return new File([blob], selectedImage.name, { type: blob.type });
};

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} A promise that resolves to the download URL of the uploaded image.
 * @throws {Error} If no file is selected or the upload fails.
 */
export const uploadImage = async file => {
  console.log(file);
  if (!file) {
    file = await getRandomInvaderImage();
  }

  try {
    const fileRef = storageRef(storage, `images/${uuidv4()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return url;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error uploading image: ${error.message}`);
  }
};

/**
 * Uploads an avatar to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The avatar file to upload.
 * @returns {Promise<string>} A promise that resolves to the download URL of the uploaded avatar.
 * @throws {Error} If no file is selected or the upload fails.
 */
export const uploadAvatar = async file => {
  if (!file) {
    file = await getRandomInvaderImage();
  }

  try {
    const fileRef = storageRef(storage, `avatars/${uuidv4()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return url;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error uploading avatar: ${error.message}`);
  }
};

/**
 * Deletes an image from Firebase Storage.
 *
 * @param {string} url - The URL of the image to delete.
 * @returns {Promise<void>} A promise that resolves when the image is deleted.
 * @throws {Error} If the deletion fails or the URL is invalid.
 */
export const deleteImage = async url => {
  try {
    const fileName = extractFilenameFromURL(url);
    const desertRef = storageRef(storage, `images/${fileName}`);
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error deleting image: ${error.message}`);
  }
};

/**
 * Deletes an avatar from Firebase Storage.
 *
 * @param {string} url - The URL of the avatar to delete.
 * @returns {Promise<void>} A promise that resolves when the avatar is deleted.
 * @throws {Error} If the deletion fails or the URL is invalid.
 */
export const deleteAvatar = async url => {
  try {
    const fileName = extractFilenameFromURL(url);
    const desertRef = storageRef(storage, `avatars/${fileName}`);
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error deleting avatar: ${error.message}`);
  }
};
