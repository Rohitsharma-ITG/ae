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
           
          

            const { chargeId , subscribeId , interval } = await request.json();
        
            if (!chargeId && subscribeId) {
                const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
                const objectId = new mongoose.Types.ObjectId(partnerId);
                const data = await database.collection("partners").findOneAndUpdate({ _id: objectId }, { $set: { subscribeId , interval } }, { returnOriginal: false });
                return json(data)
            }
        
            if (chargeId) {
                let charge = await admin.rest.resources.RecurringApplicationCharge.find({
                    session,
                    id: chargeId,
                  });
                const database = mongoose.connection.useDb(process.env.DATABASE_NAME);
                const objectId = new mongoose.Types.ObjectId(partnerId);

                const data = await database.collection("partners").findOneAndUpdate({ _id:  objectId  }, { $set: { amount: charge.price , planName:charge.name , chargeId } }, { returnOriginal: false }); 
                return json(data);
            }
          } catch (error) {
            console.error("Admin Subscription Loader Error:", error);
            return json({ error: error.message || "Internal Server Error" }, { status: 500 });
          }
    }
  
};
