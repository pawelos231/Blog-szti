import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import Link from "next/link";
import Post from "../../Posts/Post/Post";
const flag: boolean = false;
const CreatedPosts = ({ createdPosts }) => {
  return (
    <div>
      <h1 className="absolute top-36  w-full left-0 text-center">
        Stworzone przez ciebie posty:
      </h1>

      <section className="absolute top-60 left-0 w-screen flex justify-center items-center flex-col ">
        {createdPosts.length !== 0 ? (
          <div className="flex  w-[50%] justify-center flex-col gap-4 ">
            {createdPosts.map((item: SinglePostFromDatabase, i: number) => {
              return <Post key={i} item={item} flag={flag} />;
            })}
          </div>
        ) : (
          <div>Nic tu nie ma :( </div>
        )}
      </section>
    </div>
  );
};

export default CreatedPosts;
