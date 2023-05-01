import Image from "next/image";
import { toBase64, shimmer } from "@components/ShimmerEffect/Shimmer";
const PostImage = () => {
  return (
    <div className="overflow-hidden	rounded-lg bg-red-100 w-[260px]">
      <Image
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 60))}`}
        src={"/dawnofthegreg.jpg"}
        width={150}
        height={150}
        layout="responsive"
        alt="imageOfUserInput"
      />
    </div>
  );
};

export default PostImage;
