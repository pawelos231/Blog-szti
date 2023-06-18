import {
  ChangeEvent,
  useState,
  useRef,
  MutableRefObject,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { DESCRIPTION_URL } from "@constants/apisEndpoints";
import { useRouter, NextRouter } from "next/router";
import { toBase64, shimmer } from "@components/ShimmerEffect/Shimmer";
import useFetch from "@hooks/useFetch";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import withSidebar from "../HOCS/NavbarLayoutWrapper";
import withDataLoading from "@components/Wrappers/LoadingHOC";
import DescriptionComponentCurrent from "./DescLoggedUser";
import Loader from "./DescLoggedUser/loading";
import { forwardRef } from "react";

type Headers = {
  Authorization: string;
};

const ProfileDescription = withSidebar((): JSX.Element => {
  const [viewModal, setViewModal] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(null);
  const [file, setFile] = useState<File>();
  const router: NextRouter = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const headers: Headers = useMemo(() => {
    return {
      Authorization: GetToken(),
    };
  }, []);

  const {
    data: ProfileDescription,
    error,
    loading,
  } = useFetch<string>(DESCRIPTION_URL, headers, router);

  useEffect(() => {
    setDescription(ProfileDescription);
  }, [ProfileDescription]);

  const DescriptionWrapped = withDataLoading(
    loading,
    DescriptionComponentCurrent,
    Loader
  );

  return (
    <>
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
        <div className="p-2 w-[20%] m-2 text-center rounded-sm hover:scale-105 cursor-pointer transition-all">
          <label
            className="cursor-pointer text-green-500 "
            htmlFor={"ProfilePicUpload"}
          >
            Zmień profilowe!
          </label>
          <input
            id="ProfilePicUpload"
            type="file"
            className="hidden"
            placeholder="zmień profilowe"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <DescriptionWrapped
          viewModal={viewModal}
          setViewModal={useCallback((value: boolean) => {
            setViewModal(value);
          }, [])}
          setDescription={useCallback((value: string) => {
            setDescription(value);
          }, [])}
          description={description}
        />
      </div>
    </>
  );
});

export default ProfileDescription;
