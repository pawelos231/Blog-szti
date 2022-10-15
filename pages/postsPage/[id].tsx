import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import PostDetails from "../../components/PostDetailsPage/PostDetails";

const PostSite = ({ post }: { post: SinglePostFromDatabase }) => {
  return (
    <main className="w-screen flex justify-center h-screen">
      <PostDetails post={post} />
    </main>
  );
};

export default PostSite;

export const getStaticPaths: GetStaticPaths = async () => {
  const dev = process.env.NODE_ENV != "production";
  const server = dev
    ? "http://localhost:3000"
    : "https://blog2-taupe.vercel.app";

  const res = await fetch(`${server}/api/GetDataFromPost`);
  const posts: Array<SinglePostFromDatabase> | null = await res.json();

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
  const id = params.id;
  console.log(id);
  const dev = process.env.NODE_ENV != "production";
  const server = dev
    ? "http://localhost:3000"
    : "https://blog2-taupe.vercel.app";

  const res = await fetch(`${server}/api/${id}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
