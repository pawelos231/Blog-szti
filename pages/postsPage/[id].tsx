import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { IPost } from "@interfaces/PostsInterface";
import PostDetails from "@components/PostDetailsPage/PostDetails";
import mongoose from "mongoose";
import { getPostById } from "@server/db/posts";
const BlogPosts = require("../../server/models/BlogPosts");

type Props = { formattedPost: IPost };
const PostSite = ({ formattedPost }: Props) => {
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
  const paths: any = data.map((item: IPost) => {
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
  const { result, error } = await getPostById(String(id));

  if (error) {
    console.log(error);
  }

  const formattedPost: IPost = JSON.parse(JSON.stringify(result));

  return {
    props: {
      formattedPost,
    },
    revalidate: 10,
  };
};
