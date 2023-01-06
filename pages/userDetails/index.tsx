import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { increment } from "../../redux/slices/numberExampleSlice";
import { getCommentsFetch } from "../../redux/slices/PostsSlices/commentSlice";
const Index = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const state = useSelector((state: any) => {
    return state.comments;
  });
  console.log(state);
  useEffect(() => {
    dispatch(getCommentsFetch("siema"));
  }, [dispatch]);
  console.log(state);
  return (
    <div
      onClick={() => dispatch(increment())}
      className="w-full h-screen flex justify-center items-center"
    >
      siema
    </div>
  );
};

export default Index;
