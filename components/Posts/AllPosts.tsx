import * as React from "react";
import Post from "./Post/Post";
import Link from "next/link";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import { CircularProgress } from "@material-ui/core";

const AllPosts: ({ posts }) => JSX.Element = ({
  posts,
}: {
  posts: SinglePostFromDatabase[];
}) => {
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
        {posts?.map((item: SinglePostFromDatabase, i: number) => {
          return (
            <Link href={`postsPage/${item._id}`}>
              <div
                className="basis-[75%] p-4 rounded-sm flex min-h-[35vh]  border-y-[1.5px] transition-all duration-100 border-gray-300 relative hover:bg-gray-100"
                key={i}
              >
                <Post item={item} />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default AllPosts;
