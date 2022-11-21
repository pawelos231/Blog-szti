import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { increment } from "../../redux/slices/PostReducer";
const Index = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
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
