import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

//stripe 
export async function updateUserPlanByStripeCustomerId(stripeCustomerId: string, priceId: string | null) {
  const planMap: Record<string, number> = {
    "price_1SANk7Ch2J0J1cSXtDN9tN0v": 1,
    "price_1SANqICh2J0J1cSXuQe8FziZ": 1,
    "price_1SANl4Ch2J0J1cSX8KRCgCbE": 2,
    "price_1SANrgCh2J0J1cSXQc8VFVkk": 2,
    "price_1SANlmCh2J0J1cSXKbcxSvGm": 3,
    "price_1SANsxCh2J0J1cSXLNQ78Val": 3,
  };



  const plan = priceId ? planMap[priceId] : null;

  await sql`UPDATE users SET plan = ${plan} WHERE stripe_customer_id = ${stripeCustomerId}`;
}