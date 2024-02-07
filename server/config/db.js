import mongoose from "mongoose";
import colors from "colors"

const connectDb = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to MongoDB DataBase ${conn.connection.host}`.bgMagenta.white)
  } catch (error) {
    console.log(`Error in mongoDB ${error}`.bgRed.white )
  }
}

export default connectDb;