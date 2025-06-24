import { createAccessToken } from './create-access-token';
import { ADDRESS, LINE_ITEMS } from './consts';

const { CLIENT_ID, MANGOPAY_API, USER_ID, WALLET_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID || !WALLET_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, USER_ID, and WALLET_ID must be defined.'
  );
}

export async function confirmRecurringCIT() {
  const { access_token } = await createAccessToken();

  const payload = {
    AuthorId: USER_ID,
    CreditedWalletId: WALLET_ID,
    ReturnURL: 'https://localhost:6006/',
    Shipping: ADDRESS,
    RecurringPayinRegistrationId:
      'recpayinreg_wt_df6d0a29-e117-4b77-a03c-220b30d6ccde',
    LineItems: [
      {
        Name: 'Running shoes',
        Quantity: 20,
        UnitAmount: 400,
        TaxAmount: 100,
        Description: 'ID of Seller 1',
      },
      {
        Name: 'Walking shoes',
        Quantity: 10,
        UnitAmount: 900,
        TaxAmount: 100,
        Description: 'ID of Seller 2',
      },
    ],
    DebitedFunds: { Currency: 'EUR', Amount: 20000 },
    Fees: { Currency: 'EUR', Amount: 0 },
    StatementDescriptor: 'MGP Rec',
  };

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/payins/payment-methods/paypal/recurring`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('MangoPay response body:', errorText);
    throw new Error(
      `PayPal recurring CIT request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}
