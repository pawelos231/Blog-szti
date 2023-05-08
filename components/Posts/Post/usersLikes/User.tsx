type Props = {
  userName: string;
};

const User = ({ userName }: Props) => {
  return (
    <div className="  w-[20%] text-center bg-blue-400 border-2 border-red-100 rounded pt-1 pb-1">
      {userName}
    </div>
  );
};

export default User;
