import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import PostDetails from "../../components/PostDetailsPage/PostDetails";
import mongoose from "mongoose";

const BlogPosts = require("../../server/models/BlogPosts");

const PostSite = ({ post }: { post: SinglePostFromDatabase }) => {
  return (
    <div className="w-screen flex justify-center h-screen">
      <PostDetails post={post} />
    </div>
  );
};

export default PostSite;

export const getStaticPaths: GetStaticPaths = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  const data = await BlogPosts.find({});
  const paths: any = data.map((item: SinglePostFromDatabase) => {
    return {
      params: { id: String(item._id) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id: string | Array<string> = params.id;

  await mongoose.connect(process.env.DATABASE_URL);

  const Inner: any = await BlogPosts.findById(id);

  const post: SinglePostFromDatabase = JSON.parse(JSON.stringify(Inner));

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
