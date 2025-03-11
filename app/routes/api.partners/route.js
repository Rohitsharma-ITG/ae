import { json } from "@remix-run/node";
import { request } from "http";
import mongoose from "mongoose";

export const loader = async () => {

  const database = mongoose.connection.useDb("Adminpanel");
  const data = await database.collection("Partners").find().toArray();
  console.log('daata',data);
  return json(data);
};



export const action = async ({ request }) => {
    if (request.method === 'POST') {
        const id = await request.json();
        const objectId = new mongoose.Types.ObjectId(id);
        const database = mongoose.connection.useDb("Adminpanel");
        const data = await database.collection("Partners").findOne({ _id: objectId });
        if (!data) {
            return json({ message: 'No Data Found' }, { status: 404 });
        }
        return json(data);
    }
}

