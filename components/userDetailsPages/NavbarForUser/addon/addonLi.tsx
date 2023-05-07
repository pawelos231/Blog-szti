const Addonli = ({ data }: { data: string }) => {
  return (
    <li className="hover:text-blue-500  cursor-pointer z-10 transition-all duration-150 hover:scale-105">
      {data}
    </li>
  );
};

export default Addonli;
