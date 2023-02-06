import { loaderFor } from "../../components/userDetails/helpers";
import Skeleton from "./Skeleton";
const SkletonLoader = ({ LoaderFor }): JSX.Element => {
  console.log(LoaderFor);
  return (
    <>
      {LoaderFor == loaderFor.post ? (
        <>
          <div className="absolute w-full flex flex-col items-center">
            {[1, 2, 3, 4, 5].map((item: number) => (
              <Skeleton LoaderFor={LoaderFor} />
            ))}
          </div>
        </>
      ) : (
        <div className="absolute w-full  flex flex-col items-start">
          {[1, 2, 3, 4, 5].map((item: number) => (
            <Skeleton LoaderFor={LoaderFor} />
          ))}
        </div>
      )}
    </>
  );
};

export default SkletonLoader;
