import { useEffect, useState } from "react";

export const useScroll = (pageHeight: number) => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPos(Math.floor(currentPosition));
      if (currentPosition >= pageHeight) {
        setEnd(true);
      } else {
        setEnd(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPos, end };
};
