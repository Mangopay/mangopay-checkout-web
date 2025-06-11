import { createAccessToken } from './create-access-token';
import { ADDRESS, LINE_ITEMS } from './consts';

const { CLIENT_ID, MANGOPAY_API, USER_ID, WALLET_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID || !WALLET_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, USER_ID, and WALLET_ID must be defined.'
  );
}

export async function createRecurringRegistration() {
  const { access_token } = await createAccessToken();

  const payload = {
    AuthorId: USER_ID,
    CreditedWalletId: WALLET_ID,
    FirstTransactionDebitedFunds: { Currency: 'EUR', Amount: 10000 },
    FirstTransactionFees: { Currency: 'EUR', Amount: 1000 },
    Currency: 'EUR',
    StartDate: new Date().toISOString(),
    Frequency: 'MONTHLY', // Options: DAILY, WEEKLY, MONTHLY, YEARLY
    Amount: 2000,
    EndDate: null,
    Metadata: {
      description: 'Recurring PayPal Registration via SAM Fastify App',
    },
    PaymentType: 'PAYPAL',
    Shipping: ADDRESS,
    LineItems: LINE_ITEMS.map((item) => ({
      ...item,
      Category: item.Category ?? 'PHYSICAL_GOODS',
    })),
  };

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/recurringpayinregistrations`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Recurring registration request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('Recurring registration response:', data);
  return data;
}
