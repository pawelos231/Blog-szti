import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
const SwitchDarkMode = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const [flag, setFlag] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const SetThemeClick = () => {
    setFlag(!flag);
    console.log(flag);
    flag == false ? setTheme("dark") : setTheme("light");
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={styles.switch}
      data-ison={theme}
      onClick={() => SetThemeClick()}
    >
      <motion.div
        className={styles.handle}
        data-ison={theme}
        layout
        transition={spring}
      />
    </div>
  );
};
const spring: Object = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default SwitchDarkMode;
