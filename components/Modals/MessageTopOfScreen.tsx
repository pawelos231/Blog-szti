import * as React from "react";
const MessageOnTopOfScreen = ({ message }: { message: string }) => {
  return (
    <div className="absolute w-screen flex  justify-center top-12 text-2xl text-green-700">
      <div>{message}</div>
    </div>
  );
};

export default MessageOnTopOfScreen;
