import { json } from "@remix-run/node";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();



export const action = async ({request,params}) => {
    if (request.method === 'POST') {
        const id = params.id;
        const {orderAction} = await request.json();
        const partnerId = new mongoose.Types.ObjectId(id);
        const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
        let data;
        if (orderAction.length > 0) {
            data = await database.collection("ordereditinghistories").find({
                partnerId,
                orderAction: { $in: orderAction } 
            }).toArray();
        } else if (orderAction.length === 0) {
            data = await database.collection("ordereditinghistories").find({partnerId}).toArray();
        }
        if (!data) {
            return json({ message: 'No Data Found' }, { status: 404 });
        }
        return json(data);
    }
}




