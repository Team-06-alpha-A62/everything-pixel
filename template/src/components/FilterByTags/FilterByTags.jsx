import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './FilterByTags.module.scss';

const FilterByTags = ({ handleFilterBy }) => {
  const [showMore, setShowMore] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const toggleShowMore = () => {
    setShowMore(showMore => !showMore);
  };

  const handleKeyDown = e => {
    if ((e.key === 'Enter' || e.key === ' ') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags(prevTags => {
          const newTags = [...prevTags, tagInput.trim()];
          return newTags;
        });
        setTagInput('');
      }
    }
  };

  const handleDeleteTag = tagIndex => {
    setTags(prevTags => {
      const newTags = prevTags.filter((_, index) => index !== tagIndex);
      return newTags;
    });
  };

  useEffect(() => {
    handleFilterBy('tags', tags);
  }, [tags]);

  return (
    <div>
      <label htmlFor="tags">Tags</label>
      <FontAwesomeIcon
        onClick={toggleShowMore}
        icon={showMore ? faSortUp : faSortDown}
      />
      <br />
      {showMore && (
        <>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
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
        </>
      )}
    </div>
  );
};

FilterByTags.propTypes = {
  handleFilterBy: PropTypes.func,
};

export default FilterByTags;
