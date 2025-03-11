import { json } from "@remix-run/node";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { request } from "http";
dotenv.config();


export const loader = async () => {
  console.log('api hited');
  const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
  const partnerId = new mongoose.Types.ObjectId('67ca990ea7ec55341ce8ea2c');
  
  const data = await database.collection("ordereditinghistories").find({partnerId}).toArray();
  console.log('daataa',data);
  return json(data);
};


export const action = async ({request}) => {
    if (request.method === 'POST') {
        const {id,orderAction} = await request.json();
        const partnerId = new mongoose.Types.ObjectId(id);
        const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
        const data = await database.collection("ordereditinghistories").find({partnerId,orderAction}).toArray();
        if (!data) {
            return json({ message: 'No Data Found' }, { status: 404 });
        }
        return json(data);
    }
}



