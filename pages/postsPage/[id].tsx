import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import PostDetails from "../../components/PostDetailsPage/PostDetails";
import { server } from "../../config";

const PostSite = ({ post }: { post: SinglePostFromDatabase }) => {
  return (
    <main className="w-screen flex justify-center h-screen">
      <PostDetails post={post} />
    </main>
  );
};

export default PostSite;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/api/GetDataFromPost`);
  const posts: Array<SinglePostFromDatabase> | any = await res.json();

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

  const res = await fetch(`${server}/api/${id}`);
  const post: any = await res.json();
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
