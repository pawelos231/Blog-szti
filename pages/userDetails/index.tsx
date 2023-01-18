import NavbarForUserDesktop from "../../components/userDetails/NavbarForUser/NavbarForUserDesktop";
import { useTheme } from "next-themes";
const Index = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <NavbarForUserDesktop />
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div>Dodaj profilowe</div>
        <div>Dodaj opis profilu</div>
      </div>
    </>
  );
};

export default Index;
