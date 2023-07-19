import { IPost } from "@interfaces/PostsInterface";
import Post from "../../Posts/Post/Post";
import { Pagination, createTheme, ThemeProvider } from "@mui/material";
import { Theme } from "@emotion/react";
import { memo } from "react";

type Props = {
  filteredPosts: IPost[];
  text: string;
  pageNumber: number;
  handlePageChange: any;
  count: number;
};

const theme: Theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff", // Set primary text color to white
    },
  },
});

const FilteredPosts = ({
  filteredPosts,
  text,
  pageNumber,
  handlePageChange,
  count,
}: Props) => {
  return (
    <div>
      <h1 className="absolute top-36  w-full left-0 text-center">{text}</h1>

      <section className="absolute top-60 left-0 w-screen flex justify-center items-center flex-col ">
        <div className="flex  w-[50%] justify-center flex-col gap-4 ">
          {filteredPosts?.map((item, i) => {
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
        <ThemeProvider theme={theme}>
          <>
            {count > 1 ? (
              <Pagination
                color="secondary"
                shape="rounded"
                size="large"
                variant="outlined"
                count={count}
                page={pageNumber}
                onChange={handlePageChange}
              />
            ) : null}
          </>
          <div className="mt-20 mb-20"></div>
        </ThemeProvider>
      </section>
    </div>
  );
};

export default memo(FilteredPosts);
