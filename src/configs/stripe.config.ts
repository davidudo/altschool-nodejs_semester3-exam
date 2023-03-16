export const stripeConfig = {
  apiKey: process.env.STRIPE_SECRET_KEY ?? '',
  publicKey: process.env.STRIPE_PUBLIC_KEY ?? '',
}