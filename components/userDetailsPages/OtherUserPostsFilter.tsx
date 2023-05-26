import * as React from "react";
import useFetch from "@hooks/useFetch";
import FilteredPosts from "./CreatedPosts/CreatedPosts";
import { IPost } from "../../interfaces/PostsInterface";
import OtherUserNavbar from "./NavbarForUser/OtherUserNavbar";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "./helpers";
import { useRouter, NextRouter } from "next/router";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { useState, useMemo, useCallback, ChangeEvent } from "react";

type Props = {
  UrlToFetch: string;
  text: string;
  userMail: string;
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

const OtherUserPostsFilter = ({ UrlToFetch, text, userMail }: Props) => {
  const router: NextRouter = useRouter();
  const PAGE_SIZE = 10;
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
  
  if (loading && !data) return <SkletonLoader LoaderFor={loaderFor.post} />;
  if (data?.posts?.length === 0) return <div>no view</div>;

  return (
    <>
      <OtherUserNavbar userMail={userMail} />
      <div className="w-full h-screen">
        <div>
          <div>
            <FilteredPosts
              filteredPosts={data?.posts}
              text={text}
              handlePageChange={handlePageChange}
              count={Math.ceil(data?.count / PAGE_SIZE)}
              pageNumber={pageNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserPostsFilter;
