import * as React from "react";
import useFetch from "../../hooks/useFetchHook";
import CreatedPosts from "./CreatedPosts/CreatedPosts";
import { CircularProgress } from "@material-ui/core";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
const UserDeatilsMainPage = () => {
  let token: string = "";
  if (typeof window != "undefined" || typeof localStorage != "undefined") {
    token = localStorage.getItem("profile");
  }

  const [loading, err, errMessage, data] = useFetch(
    "/api/user/fetchUserSpecificData",
    token
  );
  console.log(data, loading, err, errMessage);
  const createdPosts: Readonly<SinglePostFromDatabase[]> = data?.posts?.data;
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
