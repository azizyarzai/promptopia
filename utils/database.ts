import mongoose from "mongoose";
import "@models/user";
import "@models/prompt";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  console.log("=> using new database connection");
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "share_propmpt",
    });
    console.log("MongoDB Connected...");
    isConnected = true;
  } catch (error) {
    console.log("=> error connecting to database: ", error);
  }
};
