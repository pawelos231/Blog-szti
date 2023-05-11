import { GetStaticPaths, GetStaticProps } from "next";
import { getAllUsers } from "@server/db/user";
import { getUserByEmailWithoutPassword } from "@server/db/user";
import { UserWithoutPassword } from "@server/db/user";
import OtherUserPostsFilter from "@components/userDetailsPages/OtherUserPostsFilter";
import { OTHER_USER_CREATED_POSTS } from "@constants/apisEndpoints";

type Props = { user: UserWithoutPassword };

const UserProfile = ({ user }: Props) => {
  return (
    <OtherUserPostsFilter
      UrlToFetch={`${OTHER_USER_CREATED_POSTS}/${user?.Email}`}
      text={`${user?.Name} Created Posts`}
      userMail={user?.Email}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { result, error } = await getAllUsers();
  if (error) {
    console.log(error);
  }
  const paths = result.map((item) => {
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
  const { result, error } = await getUserByEmailWithoutPassword(
    params.user as string
  );
  const user: UserWithoutPassword = JSON.parse(JSON.stringify(result));
  console.log(user);
  return {
    props: {
      user,
    },
    revalidate: 3600,
  };
};

export default UserProfile;
