import { forwardRef } from "react";
import { useCopyRef } from "@hooks/useCopyRef";
import { memo } from "react";
import { CommentScrollRef } from "../Comments";
const CommentScroll = memo(
  forwardRef<any, any>(({ scrollRef }, ref) => {
    const handleClick = () => {
      scrollRef.current?.scrollBot();
    };
    return (
      <div
        className="fixed mt-[-50vh] ml-[60vw] p-3 bg-slate-900 cursor-pointer rounded-sm transition-all hover:scale-105 hover:rounded-md z-10 "
        onClick={handleClick}
      >
        przeskroluj do dołu
      </div>
    );
  })
);

export default CommentScroll;
