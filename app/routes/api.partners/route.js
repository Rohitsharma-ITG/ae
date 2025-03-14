import { json } from "@remix-run/node";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


export const loader = async () => {

  const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
  const data = await database.collection("partners").find().toArray();
  return json(data);
};



export const action = async ({ request }) => {
    if (request.method === 'POST') {
        const id = await request.json();
        const objectId = new mongoose.Types.ObjectId(id);
        const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
        const data = await database.collection("partners").findOne({ _id: objectId });
        if (!data) {
            return json({ message: 'No Data Found' }, { status: 404 });
        }
        return json(data);
    }
}

