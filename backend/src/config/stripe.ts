import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET || "";

export default new Stripe(stripeKey);