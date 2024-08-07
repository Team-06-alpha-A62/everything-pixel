import SideBarContainer from '../../hoc/SideBarContainer/SideBarContainer';
import TrendingPostsMenu from '../TrendingPostsMenu/TrendingPostsMenu.jsx';

import PropTypes from 'prop-types';
import TrendingTagsMenu from '../TrendingTagsMenu/TrendingTagsMenu.jsx';

const RightSideBar = ({ posts }) => {
  return (
    <div>
      <SideBarContainer>
        <TrendingPostsMenu posts={posts} size={5} />
      </SideBarContainer>
      <SideBarContainer>
        <TrendingTagsMenu size={5} />
      </SideBarContainer>
    </div>
  );
};

RightSideBar.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string,
      createdOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      edited: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      tags: PropTypes.objectOf(PropTypes.bool),
    })
  ).isRequired,
};

export default RightSideBar;
