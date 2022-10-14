import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

interface TempPost {
  CreatedAt: string;
  Tags: Array<string>;
  Message: string;
  Title: string;
  Username: string;
  __v: number;
  _id: string;
}

const PostSite = ({ post }: { post: TempPost }) => {
  return (
    <main className="w-screen flex justify-center items-center h-screen">
      <div>{post.Title}</div>
    </main>
  );
};

export default PostSite;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:3000/api/GetDataFromPost`);
  const posts: Array<TempPost> | null = await res.json();

  const paths: any = posts.map((item: TempPost) => {
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
  };
};
