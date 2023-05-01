import PostsUserFilter from "@components/userDetailsPages/PostsUserFilters";
import { FETCH_USER_LIKED_POSTS } from "@constants/apisEndpoints";
const LikedPosts = () => {
  return (
    <section className="flex w-screen h-screen justify-center items-center">
      <PostsUserFilter
        UrlToFetch={FETCH_USER_LIKED_POSTS}
        text="Polikowane przez ciebie posty !"
      />
    </section>
  );
};

export default LikedPosts;
