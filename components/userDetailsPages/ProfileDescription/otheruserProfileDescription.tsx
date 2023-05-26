import { useState, useEffect } from "react";
import Image from "next/image";
import OtherUserNavbar from "../NavbarForUser/OtherUserNavbar";
import { toBase64, shimmer } from "@components/ShimmerEffect/Shimmer";
import { CircularProgress } from "@material-ui/core";
import useFetch from "@hooks/useFetch";
import NoDescriptionView from "@components/userDetailsPages/ProfileDescription/NoDescriptionView";
import { OTHER_USER_DESCRIPTION_URL } from "@constants/apisEndpoints";
import { useMemo } from "react";

type Props = { userMail: string };

const ProfileUserDescription = ({ userMail }: Props): JSX.Element => {
  const [description, setDescription] = useState<string>(null);

  const headers = useMemo(() => {
    return {};
  }, []);

  const {
    data: ProfileDescription,
    error,
    loading,
  } = useFetch<string>(`${OTHER_USER_DESCRIPTION_URL}/${userMail}`, headers);

  useEffect(() => {
    setDescription(ProfileDescription);
  }, [ProfileDescription]);

  if (!description) {
    return <NoDescriptionView />;
  }

  return (
    <>
      <OtherUserNavbar userMail={userMail} />
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="absolute top-0 w-full">
          <Image
            src={"/static.jpg"}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(100, 60)
            )}`}
            width={1000}
            layout="responsive"
            objectFit={"cover"}
            height={200}
          />
        </div>
        <div className="overflow-hidden">
          <img
            className="dark:invert"
            alt="avatar"
            src={"/avatar.png"}
            width={200}
            height={200}
          />
        </div>
        <div className="p-2 w-[20%] m-2 text-center rounded-sm hover:scale-105 cursor-pointer transition-all"></div>
        {!loading ? (
          <>
            {" "}
            <div className="w-[40%] h-[30%]">
              {description.length === 0 ? (
                <NoDescriptionView />
              ) : (
                <div className=" text-center m-2 h-[90%]  border-white rounded-sm flex justify-center items-center">
                  {description}
                </div>
              )}
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default ProfileUserDescription;
