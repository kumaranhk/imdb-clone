import mongoose from "mongoose";

export default async function mongooseConnect() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Mongoose connection established");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
}
