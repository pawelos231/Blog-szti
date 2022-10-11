import * as React from "react";
import { GetStaticPaths } from "next";
import { ArrayOfPostsExample } from "../../components/Posts/AllPosts";
const PostSite = ({ params }) => {
  console.log(params);
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

export const getStaticProps = async ({ params }) => {
  console.log(params);
  return {
    props: {
      params,
    },
  };
};
