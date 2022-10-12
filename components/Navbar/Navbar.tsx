import React from "react";
import Link from "next/link";
import { Menu, Notifications, Person } from "@material-ui/icons";
import CreatePost from "../Header/CreatePost/CreatePost";
import { useState } from "react";
const Navbar: () => JSX.Element = () => {
  const [clicked, Handle] = useState<boolean>(false);
  return (
    <>
      <nav className="z-10 fixed bg-white w-full shadow shadow-grey text-black">
        <ul className="flex gap-12 h-[9vh] mr-4 justify-between items-center">
          <li className="p-5">
            <a className="text-5xl">
              <Menu fontSize="inherit" />
            </a>
          </li>
          <li className="text-2xl  font-semibold absolute w-full text-center">
            <Link href={"/"}>SZTIBLOG</Link>
          </li>
          <li>
            <div className="flex gap-14 items-center">
              <div className="text-4xl">
                <Notifications fontSize="inherit" />
              </div>
              <div className="text-4xl">
                <Person fontSize="inherit" />
              </div>

              <div
                className="bg-white pl-7 pr-7 p-2 transition-all duration-150  rounded-xl border-2 border-gray-500 hover:border-gray-400 cursor-pointer z-10"
                onClick={() => Handle(!clicked)}
              >
                Napisz
              </div>
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
