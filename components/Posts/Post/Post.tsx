import React from "react";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import Image from "next/image";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";

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

  return (
    <div className="flex flex-col w-full cursor-pointer ">
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
        <p className="absolute right-0 top-6">{item.CreatedAt}</p>
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
      {flag ? <p className="text-gray-500">Czytaj więcej...</p> : null}
    </div>
  );
};

export default Post;
