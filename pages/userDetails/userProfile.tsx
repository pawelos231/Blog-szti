import PostsUserFilter from "@components/userDetails/PostsUserFilters";
import { FetchUrlGetCreated } from "@constants/UrlsUserFilters";

const userProfile = () => {
  return (
    <section className="flex w-screen h-screen justify-center items-center">
      <PostsUserFilter
        UrlToFetch={FetchUrlGetCreated}
        text="stworzone przez ciebie posty"
      />
    </section>
  );
};
export default userProfile;
