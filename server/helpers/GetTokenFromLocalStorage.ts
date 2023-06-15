export const GetToken = () => {
  let token: string = "";

  if (typeof window != "undefined" || typeof localStorage != "undefined") {
    token = localStorage.getItem("profile");
  }
  return token;
};
