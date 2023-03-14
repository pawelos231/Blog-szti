import React, { useEffect } from "react";
import Link from "next/link";
import { Notifications, Person } from "@material-ui/icons";
import CreatePost from "../Header/CreatePost/CreatePost";
import { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import SwitchDarkMode from "../switchers/switchMode";
import { Button } from "helper_components/Button";

const Navbar: () => JSX.Element = () => {
  const ROUTE_TO_REGISTER = "/userLogin/register";
  const ROUTE_TO_LOGIN = "/userLogin/login";

  const [profileObj, setProfileObj] = useState<Object | string>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [clicked, HandleModal] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const Logout: () => void = () => {
    localStorage.clear();
    setProfileObj({});
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setProfileObj(localStorage.getItem("profile") || "{}");
    }
  }, [router.pathname]);

  return (
    <>
      <nav className="z-10 fixed bg-white w-full shadow shadow-grey text-black dark:bg-[#191919] dark:text-white">
        <ul className="flex gap-12 h-[9vh] mr-4 justify-between items-center">
          <li className="p-5">
            <a className="text-5xl"></a>
          </li>
          <li className="text-2xl  font-semibold absolute w-full text-center">
            <Link href={"/"}>SZTIBLOG</Link>
          </li>
          <li>
            <div className="flex gap-14 items-center">
              <div className="text-4xl dark:text-[#474E68] hover:scale-110 trasition-all duration-150 cursor-pointer">
                {Object.keys(profileObj).length > 2 ? (
                  <Notifications color="inherit" fontSize="inherit" />
                ) : null}
              </div>
              <div className="text-4xl z-10 dark:text-[#474E68] hover:scale-110 trasition-all duration-150 cursor-pointer">
                {Object.keys(profileObj).length > 2 ? (
                  <Link href={"/userDetails/userProfile"}>
                    <Person fontSize="inherit" color="inherit" />
                  </Link>
                ) : null}
              </div>
              {Object.keys(profileObj).length > 2 ? (
                <Button onClick={() => HandleModal(true)}>Napisz post</Button>
              ) : null}
              <SwitchDarkMode />
              {router.pathname == ROUTE_TO_REGISTER ||
              router.pathname == ROUTE_TO_LOGIN ? null : Object.keys(profileObj)
                  .length <= 2 ? (
                <Button href={ROUTE_TO_REGISTER}> Zaloguj się</Button>
              ) : (
                <Button onClick={() => Logout()}>Wyloguj się</Button>
              )}
            </div>
          </li>
        </ul>
      </nav>
      {clicked ? (
        <div className="fixed w-screen h-screen backdrop-blur-xl flex justify-center flex-col items-center z-20 bg-black/30 ">
          <CreatePost Handle={HandleModal} />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
