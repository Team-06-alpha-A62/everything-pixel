import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth.js';

import { createPost } from '../../services/posts.service.js';
import {
  createTag,
  addPostToTag,
  tagExists,
} from '../../services/tags.service.js';
import { addUserPost } from '../../services/users.service.js';
import styles from './Publish.module.scss';
import DragZone from '../../components/DragZone/DragZone.jsx';
import Button from '../../hoc/Button/Button.jsx';
import Lottie from 'lottie-react';
import animationData from '../../assets/pacman-loading-animation.json';

const initialPostData = {
  titleInput: '',
  contentInput: '',
  tagsInput: '',
  imageUrl: '',
};

const Publish = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState(initialPostData);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getImagePreviewUrl = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        resolve(event.target.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

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

  const handleFileChange = async e => {
    const file = e.target.files[0];

    const imageUrl = await getImagePreviewUrl(file);

    setPostData({
      ...postData,
      imageUrl: imageUrl,
    });
    setImageFile(file);
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
        imageFile
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
    <div className={styles['publish-wrapper']}>
      <div className={styles['publish-container']}>
        {loading ? (
          <Lottie
            animationData={animationData}
            className={styles['lottie-animation']}
          />
        ) : (
          <>
            <h1>Publish new post</h1>
            <div className={styles['input-section']}>
              <label htmlFor="title">Title</label>
              <input
                className={styles['post-title']}
                type="text"
                name="title"
                id="title"
                autoFocus
                value={postData.titleInput}
                onChange={handleInputChange('titleInput')}
                required
              />
            </div>
            <div className={styles['input-section']}>
              <label htmlFor="tags">Tags</label>
              <div className={styles['publish-tags']}>
                {tags.map((tag, index) => {
                  return (
                    <div className={styles['tag']} key={tag}>
                      <span>{tag}</span>
                      <span
                        onClick={() => handleDeleteTag(index)}
                        className={styles['delete-tag']}
                      >
                        &times;
                      </span>
                    </div>
                  );
                })}
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={postData.tagsInput}
                  onChange={handleInputChange('tagsInput')}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div className={styles['content']}>
              <div className={styles['input-section']}>
                <label>Image</label>
                <DragZone
                  width={500}
                  height={500}
                  handleFileChange={handleFileChange}
                  imageUrl={postData.imageUrl}
                />
              </div>
              <div className={styles['input-section']}>
                <label htmlFor="content">Content</label>
                <textarea
                  className={styles['publish-textarea']}
                  name="content"
                  id="content"
                  value={postData.contentInput}
                  onChange={handleInputChange('contentInput')}
                  required
                />
              </div>
            </div>

            <div className={styles['controllers']}>
              <Button style="secondary" handleClick={() => navigate(-1)}>
                &times; Cancel
              </Button>
              <Button style="primary" handleClick={handlePublish}>
                Publish &#x2713;
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Publish;
