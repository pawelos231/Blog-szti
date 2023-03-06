import React, { useEffect } from "react";
import Link from "next/link";
import { Notifications, Person } from "@material-ui/icons";
import CreatePost from "../Header/CreatePost/CreatePost";
import { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import SwitchDarkMode from "../switchers/switchMode";

const Navbar: () => JSX.Element = () => {
  const ROUTE_TO_REGISTER = "/userLogin/register";
  const ROUTE_TO_LOGIN = "/userLogin/login";
  const [profileObj, setProfileObj] = useState<any>({});
  const [clicked, Handle] = useState<boolean>(false);
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
                <Notifications color="inherit" fontSize="inherit" />
              </div>
              <div className="text-4xl z-10 dark:text-[#474E68] hover:scale-110 trasition-all duration-150 cursor-pointer">
                {Object.keys(profileObj).length > 2 ? (
                  <Link href={"/userDetails/userProfile"}>
                    <Person fontSize="inherit" color="inherit" />
                  </Link>
                ) : null}
              </div>
              {Object.keys(profileObj).length > 2 ? (
                <div
                  className=" bg-white pl-7 pr-7 p-2 transition-all duration-150  rounded-xl border-2 border-gray-500 hover:border-gray-400 cursor-pointer z-10 hover:bg-black hover:text-white dark:bg-black dark:border-[#474E68] hover:scale-105"
                  onClick={() => Handle(!clicked)}
                >
                  Napisz Post
                </div>
              ) : null}
              <SwitchDarkMode />
              {router.pathname == ROUTE_TO_REGISTER ||
              router.pathname == ROUTE_TO_LOGIN ? null : Object.keys(profileObj)
                  .length <= 2 ? (
                <div className=" bg-white pl-7 -ml-7 pr-7 p-2 transition-all duration-150  rounded-xl border-2 border-gray-500 hover:border-gray-400 cursor-pointer z-10 hover:bg-black hover:text-white dark:bg-black dark:border-[#474E68] hover:scale-105">
                  <Link href={"/userLogin/register"}>
                    <a>Zaloguj się</a>
                  </Link>
                </div>
              ) : (
                <div
                  className=" bg-white pl-7 -ml-7 pr-7 p-2 transition-all duration-150  rounded-xl border-2 border-gray-500 hover:border-gray-400 cursor-pointer z-10 hover:bg-black hover:text-white dark:bg-black dark:border-[#474E68] hover:scale-105"
                  onClick={() => Logout()}
                >
                  Wyloguj się
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
      {clicked ? (
        <div className="fixed w-screen h-screen backdrop-blur-xl flex justify-center flex-col items-center z-20 bg-black/30 ">
          <CreatePost Handle={Handle} />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
