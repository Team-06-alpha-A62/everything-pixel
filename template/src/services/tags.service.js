import { get, set, ref, update } from 'firebase/database';
import { db } from '../config/firebase.config';

export const getAllTags = async () => {
  const snapshot = await get(ref(db, 'tags'));
  if (!snapshot.exists) return [];

  const tags = Object.values(snapshot.val());

  return tags;
};

export const getTagByHandle = async handle => {
  const snapshot = await get(ref(db, `tags/${handle}`));

  if (!snapshot.exists()) {
    return new Error('Tag not found!');
  }

  return {
    ...snapshot.val(),
    posts: Object.keys(snapshot.val().posts ?? {}),
  };
};

export const createTag = async (name, postId) => {
  const tag = { name };
  await set(ref(db, `tags/${name}`), tag);
  await update(ref(db), {
    [`tags/${name}/name`]: name,
    [`tags/${name}/posts/${postId}`]: true,
  });
};
