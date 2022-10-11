import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArrayOfPostsExample } from "../../components/Posts/AllPosts";
interface TempPost {
  post: string;
}
const PostSite = ({ params }: { params: TempPost }) => {
  return (
    <main className="w-screen flex justify-center items-center h-screen">
      <div>{params.post}</div>
    </main>
  );
};

export default PostSite;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any = ArrayOfPostsExample.map((item) => {
    return {
      params: {
        post: item,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params,
    },
  };
};
