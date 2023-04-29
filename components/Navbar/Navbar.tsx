import React, { useEffect } from "react";
import Link from "next/link";
import { Notifications, Person } from "@material-ui/icons";
import CreatePost from "../Header/CreatePost/CreatePost";
import { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import SwitchDarkMode from "../switchers/switchMode";
import { Button } from "UI/Button";
import ModalWrapper from "@components/Modals/CreatePostModal";

const Navbar: () => JSX.Element = () => {
  const ROUTE_TO_REGISTER = "/userLogin/register";
  const ROUTE_TO_LOGIN = "/userLogin/login";

  const [profileObj, setProfileObj] = useState<Object | string>({});
  const [opened, HandleOpenModal] = useState<boolean>(false);
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

  const Is_Authorized = Object.keys(profileObj).length > 2 ? true : false;
  const Is_Page_Login_Or_Register =
    router.pathname == ROUTE_TO_REGISTER || router.pathname == ROUTE_TO_LOGIN;

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
                {Is_Authorized ? (
                  <Notifications color="inherit" fontSize="inherit" />
                ) : null}
              </div>
              <div className="text-4xl z-10 dark:text-[#474E68] hover:scale-110 trasition-all duration-150 cursor-pointer">
                {Is_Authorized ? (
                  <Link href={"/userDetails/userProfile"}>
                    <Person fontSize="inherit" color="inherit" />
                  </Link>
                ) : null}
              </div>

              {Is_Authorized ? (
                <Button onClick={() => HandleOpenModal(true)}>
                  Napisz post
                </Button>
              ) : null}

              <SwitchDarkMode />
              {Is_Page_Login_Or_Register ? null : Is_Authorized ? (
                <Button onClick={() => Logout()}>Wyloguj się</Button>
              ) : (
                <Button href={ROUTE_TO_REGISTER}> Zaloguj się</Button>
              )}
            </div>
          </li>
        </ul>
      </nav>
      {opened ? (
        <ModalWrapper open={opened} onClose={HandleOpenModal}>
          <CreatePost Handle={HandleOpenModal} />
        </ModalWrapper>
      ) : null}
    </>
  );
};

export default Navbar;
