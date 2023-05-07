import {
  ChangeEvent,
  useState,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import Image from "next/image";
import NavbarForUserDesktop from "@components/userDetailsPages/NavbarForUser/NavbarForUserDesktop";
import { DESCRIPTION_URL } from "@constants/apisEndpoints";
import { POST } from "@constants/reqMeth";
import { useRouter, NextRouter } from "next/router";
import { toBase64, shimmer } from "@components/ShimmerEffect/Shimmer";
import { CircularProgress } from "@material-ui/core";
import useFetch from "@hooks/useFetch";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import NoDescriptionView from "@components/userDetailsPages/ProfileDescription/NoDescriptionView";

const ProfileDescription = (): JSX.Element => {
  const DESC_REF: MutableRefObject<HTMLTextAreaElement> = useRef(null);
  const [viewModal, setViewModal] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(null);
  const [file, setFile] = useState<File>();
  const router: NextRouter = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {
    data: ProfileDescription,
    error,
    loading,
  } = useFetch<string>(
    DESCRIPTION_URL,
    {
      Authorization: GetToken(),
    },
    router
  );

  const sendDescription = async (): Promise<void> => {
    const token = localStorage.getItem("profile");

    if (String(DESC_REF.current.value).trim().length === 0) return;

    await fetch(DESCRIPTION_URL, {
      method: POST,
      body: JSON.stringify(String(DESC_REF.current.value)),
      headers: {
        Authorization: token,
      },
    })
      .then((res: Response) => res.json())
      .then((descriptionRes: any) => {
        setDescription(descriptionRes);
        setViewModal(true);
      });
  };

  useEffect(() => {
    setDescription(ProfileDescription);
  }, [ProfileDescription]);

  if (!description) {
    return <NoDescriptionView />;
  }

  return (
    <>
      <NavbarForUserDesktop />
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
        {!loading ? (
          <>
            {" "}
            {viewModal ? (
              <div className="w-[40%] h-[30%]">
                {description.length === 0 ? (
                  <div className=" text-center m-2 h-[90%] rounded-sm flex justify-center items-center">
                    <p className="text-xl text-white">napisz tu coś...</p>
                  </div>
                ) : (
                  <div className=" text-center m-2 h-[90%]  border-white rounded-sm flex justify-center items-center">
                    {description}
                  </div>
                )}
                <div
                  className="p-2 w-full text-end cursor-pointer transition hover:scale-105"
                  onClick={() => setViewModal(!viewModal)}
                >
                  Dodaj opis
                </div>
              </div>
            ) : (
              <>
                <textarea
                  ref={DESC_REF}
                  className="w-[30%] h-[30%] p-2"
                ></textarea>
                <div className="flex">
                  <button
                    onClick={() => setViewModal(true)}
                    className="p-2 text-end hover:text-red-500"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={() => sendDescription()}
                    className="p-2 text-end hover:text-green-500"
                  >
                    Dodaj!
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default ProfileDescription;
