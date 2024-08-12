import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './FilterByTags.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterByTags = ({ filterCriteria }) => {
  const [showMore, setShowMore] = useState(true);
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
      ? searchParams.set(
          `filterBy${
            filterCriteria.slice(0, 1).toUpperCase() + filterCriteria.slice(1)
          }`,
          tags.join('_')
        )
      : searchParams.delete(
          `filterBy${
            filterCriteria.slice(0, 1).toUpperCase() + filterCriteria.slice(1)
          }`
        );

    navigate({ search: searchParams.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div className={styles['filter-by']}>
      <div className={styles['filter-by-header']} onClick={toggleShowMore}>
        <h4 htmlFor="tags">Tags</h4>
        <FontAwesomeIcon
          className={styles['filter-by-icon']}
          icon={showMore ? faSortUp : faSortDown}
        />
      </div>
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
          <div className={styles['tags']}>
            {tags.map((tag, index) => {
              return (
                <div className={styles.tag} key={tag}>
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
          </div>
        </>
      )}
    </div>
  );
};

FilterByTags.propTypes = {
  filterCriteria: PropTypes.string,
};

export default FilterByTags;
