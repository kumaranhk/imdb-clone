import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt : {
        type : Date,
        default : null
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('user',userSchema,'users');

export default userModel;
