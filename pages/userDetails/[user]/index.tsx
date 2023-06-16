import { GetStaticPaths, GetStaticProps } from "next";
import { getAllUsers, getUserByEmailWithoutPassword } from "@server/db/user";
import ProfileUserDescription from "@components/userDetailsPages/ProfileDescription/otheruserProfileDescription";
import { UserWithoutPassword } from "@server/db/user";

type Props = {
  user: UserWithoutPassword;
};

const Index = ({ user }: Props) => {
  return <ProfileUserDescription userMail={user?.Email} />;
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
  const user: UserWithoutPassword = JSON.parse(JSON.stringify(result));
  return {
    props: {
      user,
    },
    revalidate: 3600,
  };
};

export default Index;
