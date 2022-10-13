import * as React from "react";
const RespMessage = ({ message }: { message: string }) => {
  return (
    <div className="absolute w-screen flex  justify-center top-12 text-2xl text-green-700">
      <div>Udało się dodać post</div>
    </div>
  );
};

export default RespMessage;
