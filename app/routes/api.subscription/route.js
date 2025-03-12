import { json } from '@remix-run/node';
import { authenticate } from "../../shopify.server";
import dotenv from "dotenv"
dotenv.config();
 



export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const body = await request.json();
  const { price, interval ,trialDays } = body;
  
  const response = await admin.graphql(
    `#graphql
    mutation AppSubscriptionCreate(
      $name: String!
      $lineItems: [AppSubscriptionLineItemInput!]!
      $returnUrl: URL!
      $trialDays: Int!
    ) {
      appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: true ,trialDays:$trialDays,) {
        userErrors {
          field
          message
        }
        appSubscription {
          id
        }
        confirmationUrl
      }
    }`,
    {
      variables: {
        name: "customize",
        returnUrl: process.env.RETURN_URL, 
        trialDays:Number(trialDays),
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: {
                  amount: price,
                  currencyCode: "USD"
                },
                interval: interval,
              }
            }
          }
        ]
      },
    }
  );
  
  const data = await response.json();
  console.log('data====',data);
  if (data.data.appSubscriptionCreate.userErrors.length > 0) {
    return json({ error: data.data.appSubscriptionCreate.userErrors });
  }

  return json({ url: data.data.appSubscriptionCreate });
}


