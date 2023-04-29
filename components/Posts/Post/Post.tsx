import React, { useEffect } from "react";
import { IPost } from "@interfaces/PostsInterface";
import Image from "next/image";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
import {
  ThumbUpAltOutlined,
  ThumbUpAltRounded,
  Favorite,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { NOTAUTH } from "@constants/auth";
import { NextRouter } from "next/router";
import { POST } from "@constants/reqMeth";
import { stripTags } from "@helpers/stripTags";
import { LIKE_POST_URL } from "@constants/apisEndpoints";
import { isUserAuthorized, StatusType } from "@helpers/IsUserAuthorized";

interface ApiResponse {
  text: string;
  Name?: string;
}

interface LikedPosts {
  flag: number;
  ValueToPass: number;
  itemId: string;
  WhoLiked: Array<string>;
}

interface Props {
  item: IPost;
  flag: boolean;
}
enum HandleLike {
  LikePost = 1,
  UnLikePost = -1,
}

const Post = ({ item, flag }: Props) => {
  const checkIfPostIsAlreadyLiked = (): void => {
    const ifLiked: string | undefined = item.WhoLiked.find(
      (item: string) => item == localStorage.getItem("userName")
    );

    if (ifLiked) {
      setLiked(true);
    }
  };

  const [modal, openModal] = useState<boolean>(false);
  const [favourite, setFav] = useState<boolean>(true);
  const [like, setLiked] = useState<boolean>(false);
  const [likedArray, dispatchLikedArray] = useState<string[]>(item.WhoLiked);
  const router = useRouter();

  const LikesPosts = async (flag: number): Promise<void> => {
    setLiked(!like);
    const AfterComputation: number = likedArray.length + flag;

    const CombinedValues: LikedPosts = {
      ValueToPass: AfterComputation,
      flag: flag,
      itemId: item._id,
      WhoLiked: item.WhoLiked,
    };

    const userToken: string = localStorage.getItem("profile");

    await fetch(LIKE_POST_URL, {
      method: POST,
      headers: {
        Authorization: userToken,
      },
      body: JSON.stringify(CombinedValues),
    })
      .then((res: Response) => {
        isUserAuthorized(res.status as StatusType, router);
        return res.json();
      })
      .then(({ Name }: ApiResponse) => {
        if (flag == HandleLike.LikePost) {
          dispatchLikedArray([...likedArray, Name]);
        } else if (flag == HandleLike.UnLikePost) {
          dispatchLikedArray((prev: string[]) => {
            const index: number = prev.findIndex(
              (item: string) => item == Name
            );

            index > -1 ? prev.splice(index, 1) : null;
            return [...prev];
          });
        } else {
          console.log("bad flag");
        }
      });
  };

  const openWhoLikedModal = () => {
    openModal(!modal);
  };

  useEffect(() => {
    checkIfPostIsAlreadyLiked();
  }, []);

  return (
    <>
      <div
        className={
          favourite
            ? "basis-[75%]  rounded-sm flex min-h-[55vh]  border-y-[1.5px] relative"
            : "basis-[75%]  rounded-md flex min-h-[55vh]  border-4 border-amber-300 relative"
        }
      >
        <Link
          href={flag ? `postsPage/${item._id}` : `../postsPage/${item._id}`}
        >
          <div className="flex flex-col cursor-pointer w-[100%] transition-all duration-100 h-[85%] border-gray-300 relative hover:bg-gray-100 hover:dark:bg-black  ">
            {flag ? (
              <p className="mt-2 mb-6">
                <span>
                  <span className="text-gray-500">Stworzone przez: </span>{" "}
                  <span className="font-semibold	"> {item.Username}</span>
                </span>
              </p>
            ) : null}

            <div className="flex">
              <h1 className="text-3xl font-semibold w-[70%]">{item.Title}</h1>
              <p className="absolute right-0 top-0">
                {item.CreatedAt.toString().split("T")[0]}
              </p>
            </div>
            <div className="flex w-[100%] justify-between ">
              <div className="mt-4 text-gray-600 w-[70%]">
                {stripTags(item.ShortDesc)}
              </div>
              <div className="overflow-hidden	rounded-lg bg-red-100 w-[260px]">
                <Image
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(100, 60)
                  )}`}
                  src={"/dawnofthegreg.jpg"}
                  width={150}
                  height={150}
                  layout="responsive"
                  alt="imageOfUserInput"
                />
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute bottom-2 left-2 w-[97%] h-[10%]  flex justify-between items-end">
          <div className="text-4xl flex">
            {!like ? (
              <div className="flex items-center gap-4">
                <div onClick={() => LikesPosts(HandleLike.LikePost)}>
                  <ThumbUpAltOutlined fontSize="inherit" />
                </div>
                <p
                  className="text-lg  cursor-pointer "
                  onClick={() => openWhoLikedModal()}
                >
                  {likedArray.length}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-4 ">
                <div onClick={() => LikesPosts(HandleLike.UnLikePost)}>
                  <ThumbUpAltRounded fontSize="inherit" />
                </div>
                <p
                  className="text-lg cursor-pointer "
                  onClick={() => openWhoLikedModal()}
                >
                  {likedArray.length}
                </p>
              </div>
            )}
            <div
              className="text-4xl pl-6"
              onClick={() => {
                setFav(!favourite);
              }}
            >
              {favourite ? (
                <FavoriteBorderOutlined fontSize="inherit" />
              ) : (
                <Favorite fontSize="inherit" />
              )}
            </div>
          </div>
          <div>
            <p>Komentarze: {item.CommentsCount}</p>
          </div>
        </div>
        {modal ? (
          <div className="w-full h-full  bg-gray-100 absolute top-0 left-0 flex justify-center items-center flex-col">
            <div
              onClick={() => openWhoLikedModal()}
              className="absolute top-0 left-0 p-4 text-5xl cursor-pointer"
            >
              X
            </div>
            <h3 className="mb-10">Polikowali: </h3>
            <div className="flex flex-col justify-center items-center bg-white text-black w-[35%]  rounded-lg	 h-[50%] overflow-scroll overflow-x-hidden">
              {likedArray.map((userWhoLiked: string) => (
                <>
                  <div>{userWhoLiked}</div>
                </>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Post;
