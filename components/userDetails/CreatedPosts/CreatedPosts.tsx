import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import Link from "next/link";
import Post from "../../Posts/Post/Post";
const flag: boolean = false;
const CreatedPosts = ({
  createdPosts,
}: {
  createdPosts: SinglePostFromDatabase[];
}) => {
  return (
    <>
      <section className=" w-screen flex justify-center items-center flex-col">
        <h1 className="mb-16">Stworzone przez ciebie posty:</h1>
        {createdPosts.length !== 0 ? (
          <div className="flex  w-[70%] justify-center">
            {createdPosts.map((item: SinglePostFromDatabase, i: number) => {
              return (
                <Link href={`postsPage/${item._id}`}>
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
    </>
  );
};

export default CreatedPosts;
