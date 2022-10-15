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
  const res = await fetch(`http://localhost:3000/api/GetDataFromPost`);
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
  const res = await fetch(`http://localhost:3000/api/${id}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
