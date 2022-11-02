import { type } from "os";
import * as React from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetchHook";
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

  return (
    <div>
      {loading ? (
        <div>
          <div>ładuje</div>
        </div>
      ) : (
        <div>załadowano</div>
      )}
    </div>
  );
};

export default UserDeatilsMainPage;
