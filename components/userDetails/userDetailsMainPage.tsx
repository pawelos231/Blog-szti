import * as React from "react";
import useFetch from "../../hooks/useFetchHook";
import CreatedPosts from "./CreatedPosts/CreatedPosts";
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
  const createdPosts = data?.posts?.data;
  return (
    <>
      <div>
        {loading ? (
          <div>
            <div>ładuje</div>
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
