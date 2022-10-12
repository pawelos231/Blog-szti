import React from "react";
const Post: ({ item }: { item: string }) => JSX.Element = ({
  item,
}: {
  item: string;
}) => {
  return (
    <div>
      <h1>{item}</h1>
    </div>
  );
};

export default Post;
