// import mongoose from "mongoose";


// const connectDb = async () => {
//     try {
//        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/chai`, {
//         useNewUrlParser: true,
//       });
//       console.log(`MongoDB Connected: {conn.connection.host}`);
//     } catch (error) {
//       console.error(error.message);
//       process.exit(1);
//     }
//   }

//   export default connectDb

import mongoose from 'mongoose';

const connectDb = async () => {
    try {
      const conn = await mongoose.connect(`${process.env.MONGODB_URI}/chai`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDb
