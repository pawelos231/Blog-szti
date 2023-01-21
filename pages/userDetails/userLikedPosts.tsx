import PostsUserFilter from "../../components/userDetails/PostsUserFilters";
import { FetchUrlGetLiked } from "../../constants/UrlsUserFilters";
const LikedPosts = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <PostsUserFilter
        UrlToFetch={FetchUrlGetLiked}
        text="Polikowane przez ciebie posty !"
      />
    </div>
  );
};

export default LikedPosts;
