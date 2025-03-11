import { json } from "@remix-run/node";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


export const loader = async () => {
  console.log('api hited');
  const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
  const partnerId = new mongoose.Types.ObjectId('67c1a01c0e6130852b73b3f9');
  
  const data = await database.collection("ordereditinghistories").find({partnerId}).toArray();
  console.log('daataa',data);
  return json(data);
};




