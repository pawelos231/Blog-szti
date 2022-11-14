import Addonli from "./addon/addonLi";
import Link from "next/link";
const NavbarForUserDesktop = () => {
  interface Router {
    desc: string;
    href: string;
  }
  const RoutingArray: Router[] = [
    {
      desc: "Główna Posty",
      href: "/userDetails",
    },
    {
      desc: "Stworzone Posty",
      href: "/userDetails/userProfile",
    },
    {
      desc: "Stworzone Komentarze",
      href: "/userDetails/userComments",
    },
    {
      desc: "Polikowane Posty",
      href: "/userDetails/userLikedPosts",
    },
    {
      desc: "Polikowane Komentarze",
      href: "/userDetails/userLikedComments",
    },
  ];
  return (
    <nav className="flex h-full  w-[13%] fixed left-0 top-[9vh] z-10 bg-white  shadow shadow-grey">
      <ul className="flex flex-col gap-6 text-lg  w-full ml-2 mt-10">
        {RoutingArray.map((item: Router) => (
          <Link href={item.href}>
            <a>
              <Addonli data={item.desc} />
            </a>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarForUserDesktop;
