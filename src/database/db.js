import mongoose from "mongoose";

const connectionOptions = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  w: "majority",
};
export const connectDB = async (url) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid MongoDB connection URL");
  }
  let retry = 5;
  while (retry) {
    try {
      const connect = await mongoose.connect(url, connectionOptions);
      console.log(
        `MongoDB connected successfully : ${connect.connection.host}`
      );
      return;
    } catch (error) {
      retry -= 1;
      console.log(`Retrying to connect... ${retry} attempt left `);
      await new Promise((res) => setTimeout(res, 5000));
      console.error("MongoDB connection ERROR: ", error);
      if (retry === 0) {
        throw new Error("Max retry reached. Failed connect to Database");
      }
    }
  }
};
