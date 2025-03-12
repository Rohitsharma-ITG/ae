import { json } from "@remix-run/node";
import { authenticate } from "../../shopify.server";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


export const action = async ({ request, params }) => {
    if (request.method == "POST") {
        try {
            const { admin, session } = await authenticate.admin(request);
        
            const partnerId = params.id;
            const { chargeId , subscribeId , interval } = request.json();
        
            if (!chargeId) {
                const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
                const data = await database.collection("partners").findOneAndUpdate({ _id: partnerId }, { $set: { subscribeId , interval } }, { returnOriginal: false });
                return json(data)
            }
        
            if (chargeId) {
                let charge = await admin.rest.resources.RecurringApplicationCharge.find({
                    session,
                    id: chargeId,
                  });
                charge = await charge.json()
                const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
                const data = await database.collection("partners").findOneAndUpdate({ _id: partnerId }, { $set: { amount: charge.price , planName:charge.name , chargeId } }, { returnOriginal: false }); 
                return json(data);
            }
          } catch (error) {
            console.error("Admin Subscription Loader Error:", error);
            return json({ error: error.message || "Internal Server Error" }, { status: 500 });
          }
    }
  
};
