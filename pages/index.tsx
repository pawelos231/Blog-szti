import Header from "../components/Header/header";
import AllPosts from "../components/Posts/AllPosts";
import { GetStaticProps } from "next";
import mongoose from "mongoose";
const BlogPosts = require("../models/BlogPosts");

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className="flex justify-center w-full flex-col">
      <Header />
      <AllPosts posts={posts} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  const data = await BlogPosts.find({});
  const posts = JSON.parse(JSON.stringify(data));

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
