import useFetch from "@hooks/useFetch";
import { LIKED_COMMENTS } from "@constants/apisEndpoints";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { IPostComment } from "@interfaces/PostsInterface";
import SingleCommentUserProfile from "@components/PostDetailsPage/Comments/SingleComment/SingleCommentUserProfile";
import { useRouter } from "next/router";
import NoComments from "./NoComments";
const CreatedComments = (): JSX.Element => {
  const router = useRouter();
  const { data, loading, error } = useFetch<IPostComment[]>(
    LIKED_COMMENTS,
    {
      Authorization: GetToken(),
    },
    router
  );

  if (loading || !data) return <div>chyuj</div>;

  if (data && !Boolean(data.length)) return <NoComments />;

  return (
    <section>
      <div>
        {data.map((item) => {
          return <SingleCommentUserProfile comment={item} />;
        })}
      </div>
    </section>
  );
};

export default CreatedComments;
