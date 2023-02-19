import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { SinglePostFromDatabase } from "@interfaces/PostsInterface";
import PostDetails from "@components/PostDetailsPage/PostDetails";
import mongoose from "mongoose";
import { getPostById } from "@server/db/posts";
const BlogPosts = require("../../server/models/BlogPosts");

const PostSite = ({
  formattedPost,
}: {
  formattedPost: SinglePostFromDatabase;
}) => {
  return (
    <div className="w-screen flex justify-center h-screen">
      <PostDetails post={formattedPost} />
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
  const id: string | string[] = params.id;
  const { post, error } = await getPostById(id as string);

  const parsed = JSON.parse(JSON.stringify(post));
  const formattedPost: SinglePostFromDatabase = parsed;

  return {
    props: {
      formattedPost,
    },
    revalidate: 10,
  };
};
