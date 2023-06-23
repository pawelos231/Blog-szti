import { forwardRef } from "react";
import { memo } from "react";
import { useScroll } from "@hooks/useScroll";
import { motion, AnimatePresence } from "framer-motion";

const CommentScroll = memo(
  forwardRef<any, any>(({ scrollRef }) => {
    const handleScrollDown = () => {
      scrollRef.current?.scrollBot();
    };
    const handleScrollUp = () => {
      scrollRef.current?.scrollTop();
    };

    const { end, scrollPos } = useScroll(scrollRef.current?.getHeight());

    const handleClick = end ? handleScrollUp : handleScrollDown;

    const buttonVariants = {
      initial: {
        scale: 0,
        opacity: 0,
        borderRadius: "0.375rem",
        backgroundColor: "#333333",
      },
      animate: {
        scale: 1,
        opacity: 1,
      },
      hover: {
        scale: 1.05,
        borderRadius: "0.5rem",
        backgroundColor: "#444444",
      },
    };

    if (scrollRef.current?.getPosFromTop() - 550 > scrollPos) return;

    return (
      <AnimatePresence>
        <motion.div
          className="fixed mt-[-50vh] ml-[60vw] p-3 bg-slate-900 cursor-pointer"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          onClick={handleClick}
        >
          <motion.span className="text-white">
            {end ? "przeskroluj do góry" : "przeskroluj w dół"}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    );
  })
);

export default CommentScroll;
