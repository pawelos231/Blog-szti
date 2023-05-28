import mongoose from "mongoose";
import { IUserModel } from "./Interfaces/User";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserSchema = new Schema<IUserModel>({
  Name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 50
  },
  Password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [10, 'Password must be at least 10 characters long'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ]
  },
  Email: {
    type: String,
    required: true,
    validate: {
      validator: (Email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email),
      message: (props: any) => `Email ${props.value} jest niepoprawny`,
    },

  },
  ProfileImage: {
    type: String,
    default: "",
  },
  ProfileDescription: {
    type: String,
    maxlength: 1000,
    default: "",
    validate: {
      validator: (description: string) => description.length < 400,
      message: (props: any) => `Opis: ${props.value} musi mieć mniej niż 400 znaków`,
    }
  },
}, { timestamps: true })

module.exports = mongoose.models.UserData || mongoose.model<IUserModel>('UserData', UserSchema);