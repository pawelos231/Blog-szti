import PostsUserFilter from "@components/userDetailsPages/PostsUserFilters";
import { FETCH_USER_CREATED_POSTS } from "@constants/apisEndpoints";

const userProfile = () => {
  return (
    <section className="flex w-screen h-screen justify-center items-center">
      <PostsUserFilter
        UrlToFetch={FETCH_USER_CREATED_POSTS}
        text="stworzone przez ciebie posty"
      />
    </section>
  );
};
export default userProfile;
