import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [/^(?=.{8,20}$)[\s\S]+$/, "Username invalid, it should contain 8-20 characters and be unique!"], // Adjusted regex to allow any character
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
