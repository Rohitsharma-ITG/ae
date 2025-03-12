import { json } from '@remix-run/node';
import { authenticate } from "../../shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const body = await request.json();
  const { price, interval } = body;

  const response = await admin.graphql(
    `#graphql
    mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
      appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems) {
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
        name: "aeSubscription",
        returnUrl: "http://account-dev-1.shopifyapps.com/", 
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: {
                  amount: price,
                  currencyCode: "USD"
                },
                interval: interval
              }
            }
          }
        ]
      },
    }
  );

  const data = await response.json();
  if (data.data.appSubscriptionCreate.userErrors.length > 0) {
    return json({ error: data.data.appSubscriptionCreate.userErrors });
  }

  return json({ url: data.data.appSubscriptionCreate });
}


