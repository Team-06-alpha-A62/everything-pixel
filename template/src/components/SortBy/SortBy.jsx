import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SortBy({ sort, values }) {
  const [showMore, setShowMore] = useState(false);
  const [activeSort, setActiveSort] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const handleClickedValueChange = value => {
    let newActiveSort = activeSort === value ? '' : value;
    setActiveSort(newActiveSort);

    if (newActiveSort) {
      searchParams.set(`sortBy${sort}`, newActiveSort);
    } else {
      searchParams.delete(`sortBy${sort}`);
    }
    navigate({ search: searchParams.toString() });
  };

  return (
    <div>
      <span>{sort}</span>
      <FontAwesomeIcon onClick={toggleShowMore} icon={faSortDown} />
      {showMore && (
        <div>
          {values.map(value => (
            <div
              className={activeSort === value ? 'active' : ''}
              key={value}
              onClickCapture={() => {
                handleClickedValueChange(value);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
SortBy.propTypes = {
  sort: PropTypes.string.isRequired,
  values: PropTypes.array,
  handleSortBy: PropTypes.func,
};
export default SortBy;
