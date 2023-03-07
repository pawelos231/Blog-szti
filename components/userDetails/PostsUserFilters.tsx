import * as React from "react";
import useFetch from "../../hooks/useFetchHook";
import CreatedPosts from "./CreatedPosts/CreatedPosts";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
import { NextRouter, useRouter } from "next/router";
import { NotAuth } from "./constants";
import SkletonLoader from "../../helpers/views/SkeletonLoading";
import {loaderFor} from './helpers'

const PostsUserFilter = ({
  UrlToFetch,
  text,
}: {
  UrlToFetch: string;
  text: string;
}) => {
  const router: NextRouter = useRouter();
  let token: string = "";

  if (typeof window != "undefined" || typeof localStorage != "undefined") {
    token = localStorage.getItem("profile");
  }
  
  type Posts = Readonly<Array<SinglePostFromDatabase>>;

  interface Unauth {
    text: string;
  }

  const [loading, err, errMessage, FilteredPosts] = useFetch<Posts & Unauth>(
    UrlToFetch,
    token
  );

  const createdPosts: Posts = FilteredPosts;
  const NotAuthReceiver: string = FilteredPosts?.text;

  if (NotAuthReceiver == NotAuth) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      <NavbarForUserDesktop />
      <div className="w-full h-screen">
        {loading ? (
          <SkletonLoader LoaderFor={loaderFor.post} />
        ) : (
          <div>
            {!err ? (
              <div>
                <CreatedPosts createdPosts={createdPosts} text={text} />
              </div>
            ) : (
              <div>{errMessage}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostsUserFilter;
