import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { SinglePostFromDatabase } from "@interfaces/PostsInterface";
import PostDetails from "@components/PostDetailsPage/PostDetails";
import mongoose from "mongoose";
import { getPostById, getAllPosts } from "@server/db/posts";

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
  const { posts, error }: any = await getAllPosts();
  const paths: any = posts.map((item: SinglePostFromDatabase) => {
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

  const { post, error }: any = await getPostById(String(id));

  const formattedPost: SinglePostFromDatabase = JSON.parse(
    JSON.stringify(post)
  );

  return {
    props: {
      formattedPost,
    },
    revalidate: 10,
  };
};
