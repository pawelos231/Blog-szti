import useFetch from "@hooks/useFetch";
import { LIKED_COMMENTS } from "@constants/apisEndpoints";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { IPostComment } from "@interfaces/PostsInterface";
import SingleComment from "./SingleComments";
const CreatedComments = (): JSX.Element => {
  const { data, loading, error } = useFetch<IPostComment[]>(LIKED_COMMENTS, {
    Authorization: GetToken(),
  });

  console.log(data, loading, error);

  if (loading || !data) return <div>chyuj</div>;

  return (
    <section>
      <div>
        {data.map((item) => {
          return <SingleComment comment={item} />;
        })}
      </div>
    </section>
  );
};

export default CreatedComments;
