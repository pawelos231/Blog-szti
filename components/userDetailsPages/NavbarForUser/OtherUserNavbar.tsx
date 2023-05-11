import Link from "next/link";
import { RoutingArrayOtherUser } from "./data";
import Addonli from "./addon/addonLi";

type Props = { userMail: string };
const OtherUserNavbar = ({ userMail }: Props) => {
  return (
    <nav className="flex h-full  w-[13%] fixed left-0 top-[9vh] z-10 bg-white  shadow shadow-grey dark:bg-[#191919]">
      <ul className="flex flex-col gap-6 text-lg  w-full ml-2 mt-10 ">
        {RoutingArrayOtherUser(userMail).map((item, i: number) => (
          <Link key={i} href={item.href}>
            <a>
              <Addonli data={item.desc} />
            </a>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default OtherUserNavbar;
