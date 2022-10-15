import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { SinglePostFromDatabase } from "../../interfaces/PostsInterface";
import PostDetails from "../../components/PostDetailsPage/PostDetails";

const PostSite = ({ post }: { post: SinglePostFromDatabase }) => {
  return (
    <main className="w-screen flex justify-center h-screen">
      <div></div>
    </main>
  );
};

export default PostSite;
