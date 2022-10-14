import * as React from "react";
import Post from "./Post/Post";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import { CircularProgress } from "@material-ui/core";

const AllPosts: () => JSX.Element = () => {
  const [posts, SetPosts] = useState<Array<any>>([]);
  const FetchPosts = async () => {
    await fetch("/api/GetDataFromPost")
      .then((res: Response) => res.json())
      .then((data: Array<SinglePostFromDatabase>) => SetPosts(data));
  };

  useEffect(() => {
    FetchPosts();
  }, []);
  if (posts.length == 0) {
    return (
      <div className="flex justify-center mt-12 text-black">
        <CircularProgress size={102} thickness={2.0} color="inherit" />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center mt-10">
      <section className="flex flex-wrap w-[80%] gap-16 justify-center">
        {posts.map((item: SinglePostFromDatabase, i: number) => {
          return (
            <Link href={`postsPage/${item._id}`}>
              <div
                className="basis-[75%] p-4 rounded-sm flex min-h-[35vh]  border-y-[1.5px] border-gray-300 relative"
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
