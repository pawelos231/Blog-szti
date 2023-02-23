import Header from "@components/Header/header";
import AllPosts from "@components/Posts/AllPosts";
import { GetStaticProps } from "next";
import mongoose from "mongoose";
import { SinglePostFromDatabase } from "../interfaces/PostsInterface";
import { getAllPosts } from "@server/db/posts";

export default function Home({
  postsFinal,
}: {
  postsFinal: Array<SinglePostFromDatabase>;
}) {
  return (
    <div className="flex justify-center w-full flex-col">
      <Header />
      <AllPosts posts={postsFinal} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  const { posts, error }: any = await getAllPosts();
  const postsFinal: Array<SinglePostFromDatabase> = JSON.parse(
    JSON.stringify(posts)
  );

  return {
    props: {
      postsFinal,
    },
    revalidate: 10,
  };
};
