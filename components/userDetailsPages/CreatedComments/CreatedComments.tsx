import useFetch from "@hooks/useFetch";
import { LIKED_COMMENTS } from "@constants/apisEndpoints";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { IPostComment } from "@interfaces/PostsInterface";
import SingleCommentUserProfile from "@components/PostDetailsPage/Comments/SingleComment/SingleCommentUserProfile";
import { useRouter } from "next/router";
import NoComments from "./NoComments";
import { loaderFor } from "../helpers";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { Pagination, createTheme, ThemeProvider } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMemo } from "react";
import { Theme } from "@emotion/react";

type Headers = {
  Authorization: string;
  skipValue: number;
  PAGE_SIZE: number;
};

type Response = {
  comments: IPostComment[];
  count: number;
};

const PAGE_SIZE = 10;

const theme: Theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff", // Set primary text color to white
    },
  },
});

const CreatedComments = (): JSX.Element => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const headers: Headers = useMemo(() => {
    return {
      Authorization: GetToken(),
      skipValue: pageNumber,
      PAGE_SIZE: PAGE_SIZE,
    };
  }, [pageNumber]);

  const { data, loading, error } = useFetch<Response>(
    LIKED_COMMENTS,
    headers,
    router
  );

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  if (loading || !data)
    return (
      <section className="w-[100%] flex justify-center">
        <SkletonLoader LoaderFor={loaderFor.post} />
      </section>
    );

  if (data && !Boolean(data.comments.length)) return <NoComments />;

  return (
    <section className="w-[100%] flex justify-center">
      <div className="w-[40%]">
        {data?.comments?.map((item: IPostComment) => {
          return <SingleCommentUserProfile comment={item} />;
        })}
        <ThemeProvider theme={theme}>
          <div className=" flex justify-center p-6 mb-6 text-white">
            <Pagination
              color="secondary"
              shape="rounded"
              size="large"
              variant="outlined"
              count={Math.ceil(data?.count / PAGE_SIZE)}
              page={pageNumber}
              onChange={handlePageChange}
            />
          </div>
        </ThemeProvider>
      </div>
    </section>
  );
};

export default CreatedComments;
