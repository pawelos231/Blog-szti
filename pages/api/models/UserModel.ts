import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    Name: String,
    Password: String,
    Email: String
  })

module.exports = mongoose.models.UserDataSchema || mongoose.model('UserDataSchema', UserSchema);