import React from "react";
const Post = ({ item }) => {
  console.log(item);
  return (
    <div>
      <h1>{item.Title}</h1>
    </div>
  );
};

export default Post;
