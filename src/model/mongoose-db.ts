import mongoose from "mongoose";
export default mongoose
  .connect(
    "mongodb+srv://lambda:123456789hii@cluster0.fcpt7mm.mongodb.net/schoolErp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
