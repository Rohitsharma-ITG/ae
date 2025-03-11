import { json } from "@remix-run/node";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


export const loader = async () => {
  console.log('api hited');
  const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
  const partnerId = new mongoose.Types.ObjectId('67ca990ea7ec55341ce8ea2c');
  
  const data = await database.collection("ordereditinghistories").find({partnerId}).toArray();
  console.log('daataa',data);
  return json(data);
};




