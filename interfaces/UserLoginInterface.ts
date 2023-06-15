export type Register = {
  name: string;
  email: string;
  password: string;
};
export type Login = Omit<Register, "name">;

export interface Token {
  Name: string;
  Email: string;
}

export interface ReceivedLoginData {
  _id: any;
  __v: string;
  Name: string;
  Password: string;
  ProfileImage: string;
  ProfileDescription: string;
  Email: string;
}
