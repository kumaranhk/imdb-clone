import mongoose from "mongoose";

const producerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: (value) => value.length <= 25,
      get: (value) => value[0].toUpperCase() + value.slice(1),
      set: (value) => value.toLowerCase(),
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
    bio: {
      type: String,
      validate: (value) => value.length <= 500,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    UpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const producerModel = mongoose.model("producer", producerSchema, "producers");

export default producerModel;
