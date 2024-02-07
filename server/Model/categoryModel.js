import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
    unique: true,
  },
  slug : {
    type: String,
    lowercase: true,
  },
});

//creating constructor function
export default mongoose.model("Category", categorySchema)