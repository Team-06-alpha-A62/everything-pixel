import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider.jsx';
import styles from './Publish.module.scss';

const Publish = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState({
    titleInput: '',
    contentInput: '',
    tagsInput: '',
  });

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
    setTags(tags.filter((_, index) => index !== tagIndex))
  }

  const handleInputChange = key => e => {
    setPostData({
      ...postData,
      [key]: e.target.value,
    });
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
        value={postData.title}
        onChange={handleInputChange('title')}
      />
      <br />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        value={postData.content}
        onChange={handleInputChange('content')}
      />

      <br />
      <label htmlFor="tags">Tags</label>
      <div>
        {tags.map((tag, index) => {
          return (
            <div className={styles.tag} key={tag}>
              <span onClick={() => handleDeleteTag(index)}>
                &times;
              </span>
              <span>
                {tag}
              </span>
            </div>
          )
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
      <div className="controller">
        <button onClick={() => navigate(-1)}>&times; Cancel</button>
        <button
          onClick={() =>
            alert(`author: ${currentUser.userData.username},
            title: ${postData.title},
            content: ${postData.content},
            tags: ${tags}`)
          }
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default Publish;
