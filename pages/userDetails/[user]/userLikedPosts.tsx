import { GetStaticPaths, GetStaticProps } from "next";
import { getAllUsers, getUserByEmailWithoutPassword } from "@server/db/user";
import { UserWithoutPassword } from "@server/db/user";
import OtherUserPostsFilter from "@components/userDetailsPages/OtherUserPostsFilter";
import { OTHER_USER_LIKED_POSTS } from "@constants/apisEndpoints";

type Props = {
  user: UserWithoutPassword;
};

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <OtherUserPostsFilter
      UrlToFetch={`${OTHER_USER_LIKED_POSTS}/${user?.Name}`}
      text={`${user?.Name} Liked Posts`}
      userMail={user?.Email}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { result, error } = await getAllUsers();
  if (error) {
    console.log(error);
    return {
      paths: [],
      fallback: true,
    };
  }
  const paths = result.map((item: UserWithoutPassword) => {
    return {
      params: {
        user: item.Email,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userEmail = params?.user as string;
  const { result, error } = await getUserByEmailWithoutPassword(userEmail);
  if (error || !result) {
    console.log(error);
    return {
      notFound: true,
    };
  }
  const user: UserWithoutPassword = result;
  return {
    props: {
      user,
    },
    revalidate: 3600,
  };
};

export default UserProfile;
