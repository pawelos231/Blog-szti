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

  }
})

module.exports = mongoose.models.UserDataSchema || mongoose.model('UserDataSchema', UserSchema);