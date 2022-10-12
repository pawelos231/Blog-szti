import React from "react";
import Link from "next/link";
import { Menu, Notifications, Person } from "@material-ui/icons";
import { useState } from "react";
const Navbar = () => {
  const [clicked, Handle] = useState<boolean>(false);
  console.log(clicked);
  return (
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
              className="bg-white pl-6 pr-6 p-2 transition-all duration-150  rounded-xl border-2 border-gray-500 hover:border-gray-400 cursor-pointer"
              onClick={() => Handle(!clicked)}
            >
              <button>Napisz</button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
