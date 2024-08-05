import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './FilterByTags.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterByTags = ({ filterCriteria, handleFilterBy }) => {
  const [showMore, setShowMore] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

    tags.length
    ? searchParams.set(`filterBy${filterCriteria.slice(0, 1).toUpperCase() + filterCriteria.slice(1)}`, tags.join('_'))
    : searchParams.delete(`filterBy${filterCriteria.slice(0, 1).toUpperCase() + filterCriteria.slice(1)}`);

    navigate({ search: searchParams.toString() });
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
  filterCriteria: PropTypes.string,
  handleFilterBy: PropTypes.func,
};

export default FilterByTags;
