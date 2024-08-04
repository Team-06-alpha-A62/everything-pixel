import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { createPost } from '../../services/posts.service.js';
import {
  createTag,
  addPostToTag,
  tagExists,
} from '../../services/tags.service.js';
import { addUserPost } from '../../services/users.service.js';
import styles from './Publish.module.scss';

const initialPostData = {
  titleInput: '',
  contentInput: '',
  tagsInput: '',
  imageFileInput: null,
};

const Publish = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState(initialPostData);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = e => {
    if ((e.key === 'Enter' || e.key === ' ') && postData.tagsInput.trim()) {
      e.preventDefault();
      if (!tags.includes(postData.tagsInput.trim())) {
        setTags([...tags, postData.tagsInput.trim()]);
        setPostData({ ...postData, tagsInput: '' });
      }
    }
  };

  const handleDeleteTag = tagIndex => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  const handleInputChange = key => e => {
    setPostData({
      ...postData,
      [key]: e.target.value,
    });
  };

  const handleFileChange = e => {
    setPostData({
      ...postData,
      imageFileInput: e.target.files[0],
    });
  };

  const convertTagsToObject = tagsArray => {
    return tagsArray.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {});
  };

  const assignTagUpdatesToDb = async (tagsArray, postId) => {
    for (const tag of tagsArray) {
      if (!(await tagExists(tag))) {
        await createTag(tag);
      }
      await addPostToTag(tag, postId);
    }
  };

  const handlePublish = async () => {
    if (!postData.titleInput || !postData.contentInput) {
      alert('');
      return;
    }

    setLoading(true);

    try {
      const post = await createPost(
        currentUser.userData.username,
        postData.titleInput,
        postData.contentInput,
        convertTagsToObject(tags),
        postData.imageFileInput
      );

      const postId = post.key;
      setPostData(initialPostData);
      await assignTagUpdatesToDb(tags, postId);
      await addUserPost(currentUser.userData.username, postId);
      navigate('/feed');
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Publish post</h1>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        autoFocus
        value={postData.titleInput}
        onChange={handleInputChange('titleInput')}
        required
      />
      <br />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        value={postData.contentInput}
        onChange={handleInputChange('contentInput')}
        required
      />

      <br />
      <label htmlFor="tags">Tags</label>
      <div>
        {tags.map((tag, index) => {
          return (
            <div className={styles.tag} key={tag}>
              <span onClick={() => handleDeleteTag(index)}>&times;</span>
              <span>{tag}</span>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        name="tags"
        id="tags"
        value={postData.tagsInput}
        onChange={handleInputChange('tagsInput')}
        onKeyDown={handleKeyDown}
      />
      <br />
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={e => handleFileChange(e)}
      />
      <br />
      <div className="controller">
        <button onClick={() => navigate(-1)}>&times; Cancel</button>
        <button onClick={handlePublish}>Publish</button>
        {loading ? 'Publishing...' : 'Publish'}
      </div>
    </>
  );
};

export default Publish;
