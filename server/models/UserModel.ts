import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    validator: (Email: string) => Email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    message: (props: any) => `Email ${props.value} jest niepoprawny`

  },
  ProfileImage: {
    type: String,
    default: () => "",
  },
  ProfileDescription: {
    type: String,
    default: () => "",
    validator: (description: string) => description.length < 400,
    message: (props: any) => `opis: ${props.value} musi mieć mniej niz 400 znaków`
  }
})

module.exports = mongoose.models.UserData || mongoose.model('UserData', UserSchema);