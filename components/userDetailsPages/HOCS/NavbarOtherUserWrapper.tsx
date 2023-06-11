import OtherUserNavbar from "../NavbarForUser/OtherUserNavbar";

type MailProp = {
  userMail: string;
};

const withSidebarOther = <P extends MailProp>(
  Component: React.ComponentType<P>
) => {
  return function WrappedWithSidebar(props: P) {
    const { userMail } = props;
    return (
      <>
        <OtherUserNavbar userMail={userMail} />
        <Component {...props} />
      </>
    );
  };
};

export default withSidebarOther;
