import * as React from "react";
import useFetch from "@hooks/useFetch";
import FilteredPosts from "./CreatedPosts/CreatedPosts";
import { IPost } from "../../interfaces/PostsInterface";
import OtherUserNavbar from "./NavbarForUser/OtherUserNavbar";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "./helpers";

type Props = {
  UrlToFetch: string;
  text: string;
  userMail: string;
};

const OtherUserPostsFilter = ({ UrlToFetch, text, userMail }: Props) => {
  const { data, loading, error } = useFetch<IPost[]>(UrlToFetch);

  return (
    <>
      <OtherUserNavbar userMail={userMail} />
      <div className="w-full h-screen">
        {loading ? (
          <SkletonLoader LoaderFor={loaderFor.post} />
        ) : (
          <div>
            {!!data != false && data.length != 0 ? (
              <div>
                <FilteredPosts filteredPosts={data} text={text} />
              </div>
            ) : (
              <div>{!!error}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OtherUserPostsFilter;
