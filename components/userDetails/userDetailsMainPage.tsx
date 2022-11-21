import * as React from "react";
import useFetch from "../../hooks/useFetchHook";
import CreatedPosts from "./CreatedPosts/CreatedPosts";
import { CircularProgress } from "@material-ui/core";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
import { NextRouter, useRouter } from "next/router";
import { NotAuth, FetchUrl } from "./constants";
const UserDeatilsMainPage = () => {
  const router: NextRouter = useRouter();
  let token: string = "";
  if (typeof window != "undefined" || typeof localStorage != "undefined") {
    token = localStorage.getItem("profile");
  }
  type Posts = Readonly<Array<SinglePostFromDatabase>>;
  interface Unauth {
    text: string;
  }
  const [loading, err, errMessage, data] = useFetch<Posts & Unauth>(
    FetchUrl,
    token
  );
  const createdPosts: Posts = data;
  const NotAuthReceiver: string = data?.text;
  if (NotAuthReceiver == NotAuth) {
    router.push("/");
    return <></>;
  }
  return (
    <>
      <NavbarForUserDesktop />
      <div>
        {loading ? (
          <div>
            <div className="text-black">
              <CircularProgress size={102} thickness={2.0} color="inherit" />
            </div>
          </div>
        ) : (
          <div>
            {!err ? (
              <div>
                <CreatedPosts createdPosts={createdPosts} />
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

export default UserDeatilsMainPage;
