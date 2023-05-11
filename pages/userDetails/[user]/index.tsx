import { GetStaticPaths, GetStaticProps } from "next";
import { getAllUsers } from "@server/db/user";
import ProfileUserDescription from "@components/userDetailsPages/ProfileDescription/otheruserProfileDescription";
import { getUserByEmailWithoutPassword } from "@server/db/user";
import { UserWithoutPassword } from "@server/db/user";

type Props = { user: UserWithoutPassword };

const Index = ({ user }: Props) => {
  return <ProfileUserDescription userMail={user.Email} />;
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

export default Index;
