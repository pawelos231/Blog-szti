import * as React from "react";
import useFetch from "@hooks/useFetch";
import CreatedPosts from "./CreatedPosts/CreatedPosts";
import { IPost } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
import { NextRouter, useRouter } from "next/router";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "./helpers";

type Props = {
  UrlToFetch: string;
  text: string;
};

const PostsUserFilter = ({ UrlToFetch, text }: Props) => {
  const router: NextRouter = useRouter();
  let token: string = "";

  if (typeof window != "undefined" || typeof localStorage != "undefined") {
    token = localStorage.getItem("profile");
  }

  const { data, loading, error } = useFetch<IPost[]>(
    UrlToFetch,
    {
      Authorization: token,
    },
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
                <CreatedPosts createdPosts={data} text={text} />
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
