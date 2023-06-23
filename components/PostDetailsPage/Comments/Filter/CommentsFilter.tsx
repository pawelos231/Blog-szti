import { useState } from "react";
import { ChangeEvent } from "react";
import { FetchComments } from "@constants/apisEndpoints";
import { useDispatch } from "react-redux";
import { getCommentsFetch } from "@redux/slices/CommentSlice/commentSlice";
import { CommentAtionType } from "@redux/types/ActionTypes";
import { Dispatch } from "redux";
import { filterOptions } from "./FilterData";
import { FetchBody } from "./FilterData";
import { FilterOptionEnum } from "./FilterData";

type Props = { postId: string };

const CommentsFilter = ({ postId }: Props): JSX.Element => {
  const [change, handleChange] = useState<string>("Native");
  const dispatch: Dispatch<CommentAtionType> = useDispatch();

  const handleCommentFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(e.target.value);

    const body: FetchBody = {
      postId,
      filter: e.target.value as keyof typeof FilterOptionEnum,
    };

    dispatch(getCommentsFetch({ url: FetchComments, body, method: "POST" }));
  };

  return (
    <div className="absolute right-60">
      <select
        className="appearance-none bg-black border rounded py-2 px-4 pr-4 shadow"
        name="comments"
        id="filterComms"
        onChange={handleCommentFilter}
      >
        {filterOptions.map((item) => (
          <option value={item.value}>{item.text}</option>
        ))}
      </select>
    </div>
  );
};

export default CommentsFilter;
