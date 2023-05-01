type Props = {
  likedArray: string[];
};
const UsersWhichLikedPostView = ({ likedArray }: Props) => {
  return (
    <>
      {likedArray.map((userName: string) => (
        <>
          <div>{userName}</div>
        </>
      ))}
    </>
  );
};

export default UsersWhichLikedPostView;
