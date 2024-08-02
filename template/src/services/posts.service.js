import { get, push, ref, update } from 'firebase/database';
import { db } from '../config/firebase.config';

export const getAllPosts = async (search = '') => {
  const snapshot = await get(ref(db, 'posts'));

  if (!snapshot.exists()) return [];

  const posts = Object.values(snapshot.val());

  if (search) {
    return posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return posts;
};

export const getPostByHandle = async handle => {
  const snapshot = await get(ref(db, `posts/${handle}`));

  if (!snapshot.exists()) {
    throw new Error('Post not found!');
  }

  return {
    ...snapshot.val(),
    tags: Object.keys(snapshot.val().tags ?? {}),
    comments: Object.keys(snapshot.val().comments ?? {}),
    upVotedBy: Object.values(snapshot.val().votes ?? {}).filter(
      vote => vote === 'upVoted'
    ),
    downVotedBy: Object.values(snapshot.val().votes ?? {}).filter(
      vote => vote === 'downVoted'
    ),
  };
};

//we will have an image property as well in the future
export const createPost = async (author, title, content, tags) => {
  const post = { author, title, content, tags, createdOn: Date.now() };
  const result = await push(ref(db, 'posts'), post);
  const id = result.key;

  await update(ref(db), {
    [`posts/${id}/id`]: id,
  });
};

export const updatePostDetails = (handle, target, value) => {
  const updateObject = {
    [`posts/${handle}/${target}`]: value,
  };

  return update(ref(db, updateObject));
};
