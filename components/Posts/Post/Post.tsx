import React, { useEffect, useState } from "react";
import {
  ThumbUpAltOutlined,
  ThumbUpAltRounded,
  Favorite,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { POST } from "@constants/reqMeth";
import { LIKE_POST_URL } from "@constants/apisEndpoints";
import { isUserAuthorized, StatusType } from "@helpers/IsUserAuthorized";
import { Props, ApiResponse, HandleLike, LikedPosts } from "./PostInterface";
import UsersWhichLikedPostModal from "./UsersWhichLikedPostModal";
import PostContext from "./PostContext";
import PostContent from "./PostContent";
import PostCreatedBy from "./PostCreatedBy";
import PostDate from "./PostDate";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostShortDesc from "./PostShortDesc";
import PostTitle from "./PostTitle";
import PostWrapper from "./PostWrapper";

const Post = ({ post, info }: Props) => {
  const checkIfPostIsAlreadyLiked = (): void => {
    const ifLiked: string | undefined = post.WhoLiked.find(
      (item: string) => item == localStorage.getItem("userName")
    );
    if (ifLiked) {
      setLiked(true);
    }
  };

  const [modal, openModal] = useState<boolean>(false);
  const [favourite, setFav] = useState<boolean>(true);
  const [like, setLiked] = useState<boolean>(false);
  const [likedArray, dispatchLikedArray] = useState<string[]>(post.WhoLiked);

  const router = useRouter();

  const LikesPosts = async (flag: HandleLike): Promise<void> => {
    setLiked(!like);

    const CombinedValues: LikedPosts = {
      ValueToPass: likedArray.length + flag,
      flag: flag,
      itemId: post._id,
      WhoLiked: post.WhoLiked,
    };

    const userToken: string = localStorage.getItem("profile");

    await fetch(LIKE_POST_URL, {
      method: POST,
      headers: {
        Authorization: userToken,
      },
      body: JSON.stringify(CombinedValues),
    })
      .then((res: Response) => {
        isUserAuthorized(res.status as StatusType, router);
        return res.json();
      })
      .then(({ Name }: ApiResponse) => {
        if (flag == HandleLike.LikePost) {
          dispatchLikedArray([...likedArray, Name]);
        } else if (flag == HandleLike.UnLikePost) {
          dispatchLikedArray((prev) => {
            const index = prev.findIndex((item: string) => item == Name);
            index > -1 ? prev.splice(index, 1) : null;
            return [...prev];
          });
        } else {
          console.log("bad flag");
        }
      });
  };

  useEffect(() => {
    checkIfPostIsAlreadyLiked();
  }, []);

  return (
    <PostContext.Provider value={{ post }}>
      <div
        className={
          favourite
            ? "basis-[75%]  rounded-sm flex min-h-[55vh]  border-y-[1.5px] relative"
            : "basis-[75%]  rounded-md flex min-h-[55vh]  border-4 border-amber-300 relative"
        }
      >
        {info}

        <div className="absolute bottom-2 left-2 w-[97%] h-[10%]  flex justify-between items-end">
          <div className="text-4xl flex">
            <div className="flex items-center gap-4">
              {!like ? (
                <div onClick={() => LikesPosts(HandleLike.LikePost)}>
                  <ThumbUpAltOutlined fontSize="inherit" />
                </div>
              ) : (
                <div onClick={() => LikesPosts(HandleLike.UnLikePost)}>
                  <ThumbUpAltRounded fontSize="inherit" />
                </div>
              )}

              <p
                className="text-lg  cursor-pointer "
                onClick={() => openModal(!modal)}
              >
                {likedArray.length}
              </p>
            </div>

            <div
              className="text-4xl pl-6"
              onClick={() => {
                setFav(!favourite);
              }}
            >
              {favourite ? (
                <FavoriteBorderOutlined fontSize="inherit" />
              ) : (
                <Favorite fontSize="inherit" />
              )}
            </div>
          </div>
          <div>
            <p>Komentarze: {post.CommentsCount}</p>
          </div>
        </div>

        <UsersWhichLikedPostModal
          open={modal}
          onClose={openModal}
          likedArray={likedArray}
        />
      </div>
    </PostContext.Provider>
  );
};

Post.Image = PostImage;
Post.Content = PostContent;
Post.Date = PostDate;
Post.Creator = PostCreatedBy;
Post.Header = PostHeader;
Post.ShortDescriptio = PostShortDesc;
Post.Title = PostTitle;
Post.Wrapper = PostWrapper;

export default Post;
