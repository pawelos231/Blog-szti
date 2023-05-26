import NavbarForUserDesktop from "./NavbarForUser/NavbarForUserDesktop";
const withSidebar = (Component) => {
  return function WithSidebar(props) {
    return (
      <>
        <NavbarForUserDesktop />
        <Component {...props} />
      </>
    );
  };
};

export default withSidebar;
