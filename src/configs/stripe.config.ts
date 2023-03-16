export const stripeConfig = {
  apiKey: process.env.STRIPE_SECRET_KEY ?? 'your_api_key',
  publicKey: process.env.STRIPE_PUBLIC_KEY ?? 'your_test_publickey'
}
