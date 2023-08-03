import Stripe from "stripe";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? "",
  {
    apiVersion: "2022-11-15",
    appInfo: {
      name: `${PUBLIC_ROOT_DOMAIN.charAt(0).toUpperCase()}${PUBLIC_ROOT_DOMAIN.slice(1)}`,
      version: "0.1.0",
    },
  },
);

export async function cancelSubscription(customer?: string) {
  if (!customer) return;

  try {
    const subscriptionId = await stripe.subscriptions
      .list({
        customer,
      })
      .then((res) => res.data[0].id);

    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "Customer deleted their Dub project.",
      },
    });
  } catch (error) {
    console.log("Error cancelling Stripe subscription", error);
    return;
  }
}
