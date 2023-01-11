import * as React from "react";
import useFetch from "../../hooks/useFetchHook";
import CreatedPosts from "./CreatedPosts/CreatedPosts";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
import { NextRouter, useRouter } from "next/router";
import { NotAuth, FetchUrl } from "./constants";
import Skeleton from "../../helpers/views/Skeleton";

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
      <div className="w-full h-screen">
        {loading ? (
          <div className="absolute w-full flex items-center flex-col">
            {[1, 2, 3, 4, 5].map((item: number) => {
              return (
                <>
                  <Skeleton />
                </>
              );
            })}
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
