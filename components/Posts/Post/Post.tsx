import React from "react";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import Image from "next/image";
const Post = ({ item }: { item: SinglePostFromDatabase }) => {
  function stripTags(original: string): string {
    return original.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div className="flex flex-col w-full cursor-pointer hover:bg-gray-100">
      <p className="mt-2 mb-6">
        <span>
          <span className="text-gray-500">Stworzone przez: </span>{" "}
          <span className="font-semibold	"> {item.Username}</span>
        </span>
      </p>
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
            src={"/dawnofthegreg.jpg"}
            width={150}
            height={150}
            layout="responsive"
            alt="imageOfUserInput"
          />
        </div>
      </div>
      <p className="text-gray-500">Czytaj więcej...</p>
    </div>
  );
};

export default Post;
