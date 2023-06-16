import Header from "@components/Header/header";
import AllPosts from "@components/Posts/AllPosts";
import { GetStaticProps } from "next";
import { IPost } from "../interfaces/PostsInterface";
import { getAllPosts } from "@server/db/posts";
import { WrapperForQuery } from "@server/db/DatabaseFunctionsWrapper";

type Posts = Array<IPost>;
type Props = { postsFinal: Posts };

export default function Home({ postsFinal }: Props) {
  return (
    <div className="flex justify-center w-full flex-col">
      <Header />
      <AllPosts posts={postsFinal} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const result = await WrapperForQuery<typeof getAllPosts, Posts>(getAllPosts);

  const postsFinal: Posts = JSON.parse(JSON.stringify(result));

  return {
    props: {
      postsFinal,
    },
    revalidate: 10,
  };
};
