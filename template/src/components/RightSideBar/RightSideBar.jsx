import SideBarContainer from '../../hoc/SideBarContainer/SideBarContainer';
import TrendingPostsMenu from '../TrendingPostsMenu/TrendingPostsMenu.jsx';

import PropTypes from 'prop-types';
import TrendingTagsMenu from '../TrendingTagsMenu/TrendingTagsMenu.jsx';

const RightSideBar = () => {
  return (
    <div>
      <SideBarContainer>
        <TrendingPostsMenu size={5} />
      </SideBarContainer>
      <SideBarContainer>
        <TrendingTagsMenu size={5} />
        </SideBarContainer>
    </div>
  );
};

RightSideBar.propTypes = {
  posts: PropTypes.any,
};

export default RightSideBar;
