import Skeleton from "./Skeleton";
const SkletonLoader = (): JSX.Element => {
  return (
    <div className="absolute w-full flex items-center flex-col ">
      {[1, 2, 3, 4, 5].map((item: number) => {
        return (
          <>
            <Skeleton />
          </>
        );
      })}
    </div>
  );
};

export default SkletonLoader;
