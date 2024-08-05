import SideBarContainer from '../../hoc/SideBarContainer/SideBarContainer';
import FilterPostsMenu from '../FilterPostsMenu/FilterPostsMenu';
import SortPostsMenu from '../SortPostsMenu/SortPostsMenu';
import TredingPostsMenu from '../TrendingPostsMenu/TredingPostsMenu';

function RightSideBar({ posts }) {
  return (
    <div>
      <SideBarContainer>
        <TredingPostsMenu posts={posts} size={5} />
      </SideBarContainer>
      {/* <SideBarContainer>
        <FilterPostsMenu handleFilterBy={handleFilterBy} />
      </SideBarContainer> */}
    </div>
  );
}

export default RightSideBar;
