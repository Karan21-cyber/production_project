import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16", // Use the specified version or the latest version available at the time
});

async function createSubscriptionProduct(): Promise<void> {
  console.log(process.env.STRIPE_SECRET_KEY);

  try {
    const product = await stripe.products.create({
      name: "Starter Subscription",
      description: "$12/Month subscription",
    });

    const price = await stripe.prices.create({
      unit_amount: 20,
      currency: "usd",
      recurring: {
        interval: "month",
      },
      product: product.id,
    });

    console.log(
      "Success! Here is your starter subscription product id: " + product.id
    );
    console.log(
      "Success! Here is your starter subscription price id: " + price.id
    );
  } catch (error) {
    console.error("Error creating subscription product:", error);
  }
}

export default createSubscriptionProduct;
