import { Document } from "mongoose";

export interface IUserModel extends Document {
    Name: string;
    Password: string;
    Email: string;
    ProfileImage: string;
    ProfileDescription: string;
  }