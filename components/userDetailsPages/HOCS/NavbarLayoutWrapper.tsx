import React, { ComponentType } from "react";
import NavbarForUserDesktop from "../NavbarForUser/NavbarForUserDesktop";

const withSidebar = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  const WrappedWithSidebar: React.FC<P> = (props) => (
    <>
      <NavbarForUserDesktop />
      <Component {...props} />
    </>
  );

  return WrappedWithSidebar;
};

export default withSidebar;
