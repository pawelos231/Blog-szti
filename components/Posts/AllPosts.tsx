import * as React from "react";
import Post from "./Post/Post";
import Link from "next/link";
import { useEffect, useState } from "react";
export let ArrayOfPostsExample: Array<string> = [
  "nie",
  "opcja",
  "t",
  "1",
  "2",
  "3",
];

const AllPosts: () => JSX.Element = () => {
  const [posts, SetPosts] = useState<Array<any>>([]);
  const FetchPosts = async () => {
    await fetch("/api/GetDataFromPost")
      .then((res: Response) => res.json())
      .then((data: Array<any>) => SetPosts(data));
  };

  useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <div className="w-full flex justify-center mt-10">
      <section className="flex flex-wrap w-[80%] gap-12 justify-center">
        {posts.map((item: any, i: number) => {
          return (
            <Link href={`postsPage/${item._id}`}>
              <div
                className="basis-[28%] p-2 flex justify-center items-center h-[20vh] bg-stone-500"
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
