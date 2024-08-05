import SideBarContainer from '../../hoc/SideBarContainer/SideBarContainer';
import TredingPostsMenu from '../TrendingPostsMenu/TredingPostsMenu';

import PropTypes from 'prop-types';

const RightSideBar = ({ posts }) => {
  return (
    <div>
      <SideBarContainer>
        <TredingPostsMenu posts={posts} size={5} />
      </SideBarContainer>
      {/* <SideBarContainer>
        // we should add trending tags
        </SideBarContainer> */}
    </div>
  );
};

RightSideBar.propTypes = {
  posts: PropTypes.any,
};

export default RightSideBar;
