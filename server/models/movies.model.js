import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: (value) => value.length <= 64,
      get: (value) => value[0].toUpperCase() + value.slice(1),
      set: (value) => value.toLowerCase(),
    },
    yearOfRelease: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      validate: (value) => value.length <= 500,
    },
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "actor",
      },
    ],
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "producer",
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

const movieModel = mongoose.model("movie", movieSchema, "movies");

export default movieModel;
