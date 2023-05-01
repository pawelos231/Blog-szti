import * as React from "react";
import Post from "./Post/Post";
import { IPost } from "../../interfaces/PostsInterface";
import NoPostView from "./NoPostView";

type Props = { posts: IPost[] };

const AllPosts = ({ posts }: Props): JSX.Element => {
  if (posts?.length == 0) {
    return <NoPostView />;
  }
  return (
    <div className="w-full flex justify-center mt-10">
      <section className="flex flex-wrap w-[80%] gap-16 justify-center">
        {posts?.map((item, i) => {
          return (
            <Post
              key={i}
              post={item}
              flag={true}
              info={
                <Post.Wrapper>
                  <Post.Creator />
                  <Post.Header>
                    <Post.Title />
                    <Post.Date />
                  </Post.Header>
                  <Post.Content>
                    <Post.ShortDescriptio />
                    <Post.Image />
                  </Post.Content>
                </Post.Wrapper>
              }
            />
          );
        })}
      </section>
    </div>
  );
};

export default AllPosts;
