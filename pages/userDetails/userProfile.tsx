import * as React from "react";
import UserDeatilsMainPage from "../../components/userDetails/userDetailsMainPage";
import useFetch from "../../hooks/useFetchHook";

const userProfile = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <UserDeatilsMainPage />
    </div>
  );
};
export default userProfile;
