import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { increment } from "../../redux/slices/numberExampleSlice";
import { getCommentsFetch } from "../../redux/slices/PostsSlices/commentSlice";
import NavbarForUserDesktop from "../../components/userDetails/NavbarForUser/NavbarForUserDesktop";
const Index = () => {
  return (
    <>
      <NavbarForUserDesktop />
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div>Dodaj profilowe</div>
        <div>Dodaj opis profilu</div>
      </div>
    </>
  );
};

export default Index;
