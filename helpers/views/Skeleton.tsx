import styles from "./style.module.css";
import { useTheme } from "next-themes";
import { loaderFor } from "@components/userDetails/helpers";
const Skeleton = ({ LoaderFor }): JSX.Element => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`${styles.wrapper}
       w-[70%] left-36 h-[70%]  relative flex ${
         loaderFor.Comment == LoaderFor ? "" : "justify-center top-36"
       } m-16`}
    >
      <div className={`${styles.grid} flex justify-center`}></div>

      <div data-isOn={theme} className={`${styles.card} w-[70%] relative`}>
        <div className={styles.header}>
          <div
            className={`${styles.skeleton} ${styles.headerImg} absolute right-0`}
          />
          <div className={styles.title}>
            <div className={`${styles.skeleton}, ${styles.skeletonText}`}></div>
            <div className={`${styles.skeleton}, ${styles.skeletonText}`}></div>
          </div>
        </div>
        <div className="flex gap-2 flex-col dark">
          <div className={`${styles.skeleton} mt-10`}>
            <p className={styles.mainP}>.</p>
          </div>
          <div className={`${styles.skeleton}`}>
            <p className={styles.mainP}>.</p>
          </div>
          {LoaderFor == loaderFor.post ? (
            <>
              <div className={`${styles.skeleton}`}>
                <p className={styles.mainP}>.</p>
              </div>{" "}
              <div className={`${styles.skeleton}`}>
                <p className={styles.mainP}>.</p>
              </div>{" "}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
