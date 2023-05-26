import OtherUserNavbar from "./NavbarForUser/OtherUserNavbar";

type MailProp = {
  userMail: string;
};

const withSidebarOther = (Component) => {
  return function WithSidebar(props) {
    const { userMail }: MailProp = props;
    return (
      <>
        <OtherUserNavbar userMail={userMail} />
        <Component {...props} />
      </>
    );
  };
};

export default withSidebarOther;
