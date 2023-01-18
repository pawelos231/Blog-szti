import Header from "../components/Header/header";
import AllPosts from "../components/Posts/AllPosts";
import { GetStaticProps } from "next";
import mongoose from "mongoose";
const BlogPosts = require("../server/models/BlogPosts");
import { SinglePostFromDatabase } from "../interfaces/PostsInterface";
import SwitchDarkMode from "../components/switchers/switchMode";

export default function Home({
  posts,
}: {
  posts: Array<SinglePostFromDatabase>;
}) {
  return (
    <div className="flex justify-center w-full flex-col">
     
      <Header />
      <AllPosts posts={posts} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  const data: any = await BlogPosts.find({});
  const posts: Array<SinglePostFromDatabase> = JSON.parse(JSON.stringify(data));

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
