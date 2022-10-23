import * as React from "react";
import { useEffect } from "react";
const UserDeatilsMainPage = () => {
  const FetchSpecificUserPosts = async () => {
    const token: string = localStorage.getItem("profile");
    await fetch("/api/user/fetchUserSpecificData", {
      headers: {
        Authorization: token,
      },
    })
      .then((res: Response) => res.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    FetchSpecificUserPosts();
  }, []);

  return (
    <div>
      <div onClick={() => FetchSpecificUserPosts()}>siema</div>
    </div>
  );
};

export default UserDeatilsMainPage;
