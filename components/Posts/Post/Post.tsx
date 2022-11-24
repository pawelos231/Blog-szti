import React from "react";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import Image from "next/image";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
import { ThumbUpAltOutlined, ThumbUpAltRounded } from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
const Post = ({
  item,
  flag,
}: {
  item: SinglePostFromDatabase;
  flag: boolean;
}) => {
  function stripTags(original: string): string {
    return original.replace(/(<([^>]+)>)/gi, "");
  }
  const [favorite, setLiked] = useState<boolean>(false);
  const setLikedPostHandler: () => void = () => {
    setLiked(!favorite);
  };
  return (
    <>
      <Link href={`postsPage/${item._id}`}>
        <div className="flex flex-col cursor-pointer w-[100%] transition-all duration-100 h-[85%] border-gray-300 relative hover:bg-gray-100 ">
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
            <p className="absolute right-0 top-0">{item.CreatedAt}</p>
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
      <div className="absolute bottom-0 w-[97%] h-[10%]  flex justify-between items-end">
        <div className="text-4xl " onClick={() => setLikedPostHandler()}>
          {!favorite ? (
            <ThumbUpAltOutlined fontSize="inherit" />
          ) : (
            <ThumbUpAltRounded fontSize="inherit" />
          )}
        </div>
        <div>
          <p>Komentarze: 5</p>
        </div>
      </div>
    </>
  );
};

export default Post;
