import * as React from "react";
import useFetch from "@hooks/useFetch";
import FilteredPosts from "./CreatedPosts/CreatedPosts";
import { IPost } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
import { NextRouter, useRouter } from "next/router";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "./helpers";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { useMemo } from "react";

type Props = {
  UrlToFetch: string;
  text: string;
};
type Headers = {
  Authorization: string;
};

const PostsUserFilter = ({ UrlToFetch, text }: Props) => {
  const router: NextRouter = useRouter();

  const headers: Headers = useMemo(() => {
    return {
      Authorization: GetToken(),
    };
  }, []);

  const { data, loading, error } = useFetch<IPost[]>(
    UrlToFetch,
    headers,
    router
  );

  return (
    <>
      <NavbarForUserDesktop />
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

export default PostsUserFilter;
