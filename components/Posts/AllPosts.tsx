import * as React from "react";
import Post from "./Post/Post";
import { IPost } from "../../interfaces/PostsInterface";
import { CircularProgress } from "@material-ui/core";

type Posts = IPost[];
const AllPosts = ({ posts }: { posts: Posts }): JSX.Element => {
  if (posts?.length == 0) {
    return (
      <div className="flex justify-center mt-12 text-black">
        <CircularProgress size={102} thickness={2.0} color="inherit" />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center mt-10">
      <section className="flex flex-wrap w-[80%] gap-16 justify-center">
        {posts?.map((item: IPost, i: number) => {
          return <Post key={i} item={item} flag={true} />;
        })}
      </section>
    </div>
  );
};

export default AllPosts;
