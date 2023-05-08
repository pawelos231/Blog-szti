import ModalWrapper from "@components/Modals/ModalWrapper";
import UsersWhichLikedPostView from "./UsersWhichLikedPostView";
import { memo } from "react";
type Props = {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  likedArray: string[];
};

const UsersWhichLikedPostModal = ({ open, onClose, likedArray }: Props) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <UsersWhichLikedPostView likedArray={likedArray} />
    </ModalWrapper>
  );
};

export default memo(UsersWhichLikedPostModal);
