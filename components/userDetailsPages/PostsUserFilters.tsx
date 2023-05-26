import * as React from "react";
import useFetch from "@hooks/useFetch";
import FilteredPosts from "./CreatedPosts/CreatedPosts";
import { IPost } from "../../interfaces/PostsInterface";
import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
import { NextRouter, useRouter } from "next/router";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "./helpers";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { useMemo, useCallback } from "react";
import { useState } from "react";
import NoPosts from "./CreatedPosts/NoPostsView/NoPosts";
import { ChangeEvent } from "react";
import withSidebar from "./NavbarLayoutWrapper";

const PAGE_SIZE = 10;

type Props = {
  UrlToFetch: string;
  text: string;
};

type Headers = {
  Authorization: string;
  skipValue: number;
  PAGE_SIZE: number;
};

type Response = {
  posts: IPost[];
  count: number;
};

const PostsUserFilter = withSidebar(({ UrlToFetch, text }: Props) => {
  const router: NextRouter = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const headers: Headers = useMemo(() => {
    return {
      Authorization: GetToken(),
      skipValue: pageNumber,
      PAGE_SIZE: PAGE_SIZE,
    };
  }, [pageNumber]);

  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      setPageNumber(value);
    },
    []
  );

  const { data, loading, error } = useFetch<Response>(
    UrlToFetch,
    headers,
    router
  );

  if (loading || !data) {
    return (
      <section className="w-[100%] flex justify-center">
        <SkletonLoader LoaderFor={loaderFor.post} />
      </section>
    );
  }
  if (data?.posts?.length === 0) return <NoPosts />;

  return (
    <>
      <div className="w-full h-screen">
        <div>
          <div>
            <FilteredPosts
              filteredPosts={data?.posts}
              text={text}
              handlePageChange={handlePageChange}
              count={Math.ceil(data.count / PAGE_SIZE)}
              pageNumber={pageNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default PostsUserFilter;
