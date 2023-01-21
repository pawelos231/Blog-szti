import * as React from "react";
import PostsUserFilter from "../../components/userDetails/PostsUserFilters";
import { FetchUrlGetCreated } from "../../constants/UrlsUserFilters";

const userProfile = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <PostsUserFilter
        UrlToFetch={FetchUrlGetCreated}
        text="stworzone przez ciebie posty"
      />
    </div>
  );
};
export default userProfile;
