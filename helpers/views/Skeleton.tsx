import styles from "./style.module.css";
import { useTheme } from "next-themes";
const Skeleton = () => {
  return (
    <div className="top-36 w-[70%] left-36  relative  flex justify-center">
      <div className={`${styles.grid} flex justify-center`}></div>

      <div className={`${styles.card} w-[70%] relative`}>
        <div className={styles.header}>
          <div
            className={`${styles.skeleton} ${styles.headerImg} absolute right-0`}
          />
          <div className={styles.title} data-title>
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
          <div className={`${styles.skeleton}`}>
            <p className={styles.mainP}>.</p>
          </div>{" "}
          <div className={`${styles.skeleton}`}>
            <p className={styles.mainP}>.</p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
