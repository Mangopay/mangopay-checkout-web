import { createAccessToken } from './create-access-token';
import {
  BROWSER_INFO,
  ADDRESS,
  SECURE_MODE_RETURN_URL as DefaultSecureModeReturnURL,
} from './consts';

const { CLIENT_ID, MANGOPAY_API, USER_ID, WALLET_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID || !WALLET_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, USER_ID, and WALLET_ID must be defined.'
  );
}

export async function createGooglePayPayIn(paymentData, secureModeReturnURL) {
  console.log('Google Pay paymentData received:', paymentData);
  const { access_token } = await createAccessToken();

  const payload = {
    Tag: 'Created using the SAM Fastify app',
    AuthorId: USER_ID,
    DebitedFunds: { Currency: 'EUR', Amount: 1500 },
    Fees: { Currency: 'EUR', Amount: 0 },
    CreditedWalletId: WALLET_ID,
    SecureModeReturnURL: secureModeReturnURL || DefaultSecureModeReturnURL,
    StatementDescriptor: 'Checkout',
    Shipping: ADDRESS,
    Billing: ADDRESS,
    Culture: 'FR',
    Reference: 'MGP-SAM-GooglePay',
    PaymentData: paymentData,
    IpAddress: '159.180.248.187',
    BrowserInfo: BROWSER_INFO,
  };

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/payins/payment-methods/googlepay`;
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
      `Google Pay pay-in request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('Google Pay pay-in response:', data);
  return data;
}
