import NavbarForUserDesktop from "../../components/userDetails/NavbarForUser/NavbarForUserDesktop";
const Index = () => {
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
