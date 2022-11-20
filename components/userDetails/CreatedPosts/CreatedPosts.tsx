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
              return (
                <Link href={`../postsPage/${item._id}`}>
                  <div
                    className="basis-[75%] p-4 rounded-sm flex min-h-[35vh]  border-y-[1.5px] transition-all duration-100 border-gray-300 relative hover:bg-gray-100"
                    key={i}
                  >
                    <Post item={item} flag={flag} />
                  </div>
                </Link>
              );
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
