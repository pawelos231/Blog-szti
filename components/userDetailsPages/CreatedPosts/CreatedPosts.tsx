import { IPost } from "@interfaces/PostsInterface";
import Post from "../../Posts/Post/Post";
import NoPosts from "./NoPostsView/NoPosts";

type Props = {
  filteredPosts: IPost[];
  text: string;
};

const FilteredPosts = ({ filteredPosts, text }: Props) => {
  return (
    <div>
      <h1 className="absolute top-36  w-full left-0 text-center">{text}</h1>

      <section className="absolute top-60 left-0 w-screen flex justify-center items-center flex-col ">
        {filteredPosts.length !== 0 ? (
          <div className="flex  w-[50%] justify-center flex-col gap-4 ">
            {filteredPosts.map((item, i) => {
              return (
                <Post
                  key={i}
                  post={item}
                  info={
                    <Post.Wrapper>
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
          </div>
        ) : (
          <NoPosts />
        )}
      </section>
    </div>
  );
};

export default FilteredPosts;
