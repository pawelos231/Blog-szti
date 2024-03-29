import * as React from "react";
import Image from "next/image";
import { IPost } from "../../interfaces/PostsInterface";
import { useEffect } from "react";
import Comments from "./Comments/Comments";
import CreateComment from "./Comments/CreateComment";

type Props = { post: IPost };

const PostDetails = ({ post }: Props) => {
  useEffect(() => {
    if (document != undefined) {
      document.querySelector("#inner").innerHTML = post.Message;
    }
  }, []);
  return (
    <div className="mt-[12vh]  max-w-[60vw]">
      <div className=" overflow-hidden	rounded  height-[50vh] w-[60vw] mb-12 ">
        <Image
          src="/dawnofthegreg.jpg"
          width={200}
          height={100}
          alt="no image"
          layout="responsive"
          objectFit="cover"
          quality={60}
          objectPosition="50% 50%"
        />
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold pb-6 ">{post?.Title}</h1>
        <p>{post?.CreatedAt.toString().split("T")[0]}</p>
      </div>

      <div className="w-[60vw]" id="inner">
        {post?.Message}
      </div>
      <div className="w-[60vw] h-[1px] bg-gray-300 mt-16"></div>
      <CreateComment post={post} />
      <Comments post={post} />
    </div>
  );
};

export default PostDetails;
