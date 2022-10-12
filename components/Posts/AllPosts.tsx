import React from "react";
import Post from "./Post/Post";
import Link from "next/link";
export let ArrayOfPostsExample: Array<string> = [
  "nie",
  "opcja",
  "t",
  "1",
  "2",
  "3",
];
const AllPosts: () => JSX.Element = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <section className="flex flex-wrap w-[80%] gap-12 justify-center">
        {ArrayOfPostsExample.map((item: string, i: number) => {
          return (
            <Link href={`/postsPage/${item}`}>
              <div
                key={i}
                className="basis-[28%] p-2 flex justify-center items-center h-[20vh] bg-stone-500"
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
