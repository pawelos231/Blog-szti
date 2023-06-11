import React, { useCallback, useEffect, useState } from "react";
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
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import UsersWhichLikedPostModal from "./usersLikes/UsersWhichLikedPostModal";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedArray, setLikedArray] = useState<string[]>(post.WhoLiked);

  const router = useRouter();

  const checkIfPostIsAlreadyLiked = (): void => {
    const isAlreadyLiked = post.WhoLiked.includes(
      localStorage.getItem("userName")
    );
    setIsLiked(isAlreadyLiked);
  };

  const handleModalClose = useCallback((flag: boolean) => {
    setModalOpen(flag);
  }, []);

  const handleLikes = async (flag: HandleLike): Promise<void> => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    const combinedValues: LikedPosts = {
      ValueToPass: likedArray.length + flag,
      flag: flag,
      itemId: post._id,
      WhoLiked: post.WhoLiked,
    };

    try {
      const response = await fetch(LIKE_POST_URL, {
        method: POST,
        headers: {
          Authorization: GetToken(),
        },
        body: JSON.stringify(combinedValues),
      });

      isUserAuthorized(response.status as StatusType, router);

      const { Name }: ApiResponse = await response.json();

      if (flag === HandleLike.LikePost) {
        setLikedArray((prevLikedArray) => [...prevLikedArray, Name]);
      } else if (flag === HandleLike.UnLikePost) {
        setLikedArray((prevLikedArray) => {
          const index = prevLikedArray.findIndex(
            (item: string) => item === Name
          );
          if (index > -1) {
            prevLikedArray.splice(index, 1);
          }
          return [...prevLikedArray];
        });
      } else {
        console.log("Invalid flag");
      }
    } catch (error) {
      console.error(error);
      // Handle error scenario and display an error message
    }
  };

  useEffect(() => {
    checkIfPostIsAlreadyLiked();
  }, []);

  return (
    <PostContext.Provider value={{ post }}>
      <div
        className={
          isFavorite
            ? "basis-[75%] rounded-sm flex min-h-[55vh] border-y-[1.5px] relative"
            : "basis-[75%] rounded-md flex min-h-[55vh] border-4 border-amber-300 relative"
        }
      >
        {info}

        <div className="absolute bottom-2 left-2 w-[97%] h-[10%] flex justify-between items-end">
          <div className="text-4xl flex">
            <div className="flex items-center gap-4">
              {!isLiked ? (
                <div onClick={() => handleLikes(HandleLike.LikePost)}>
                  <ThumbUpAltOutlined fontSize="inherit" />
                </div>
              ) : (
                <div onClick={() => handleLikes(HandleLike.UnLikePost)}>
                  <ThumbUpAltRounded fontSize="inherit" />
                </div>
              )}

              <p
                className="text-lg cursor-pointer"
                onClick={() => setModalOpen(!modalOpen)}
              >
                {likedArray.length}
              </p>
            </div>

            <div
              className="text-4xl pl-6"
              onClick={() => {
                setIsFavorite(!isFavorite);
              }}
            >
              {isFavorite ? (
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
          open={modalOpen}
          onClose={handleModalClose}
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
