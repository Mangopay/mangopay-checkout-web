import createAccessToken from './create-access-token';
import { BROWSER_INFO, ADDRESS } from './consts';

const { CLIENT_ID, MANGOPAY_API, USER_ID, WALLET_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID || !WALLET_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, USER_ID, and WALLET_ID must be defined.'
  );
}

export default async function createApplePayPayIn(paymentData) {
  console.log('PaymentData received:', paymentData);

  const { access_token } = await createAccessToken();

  const payload = {
    Tag: 'Created using the SAM Fastify app',
    AuthorId: USER_ID,
    DebitedFunds: { Currency: 'EUR', Amount: 2000 },
    Fees: { Currency: 'EUR', Amount: 0 },
    CreditedWalletId: WALLET_ID,
    StatementDescriptor: 'Checkout',
    Shipping: ADDRESS,
    Billing: ADDRESS,
    Culture: 'FR',
    Reference: 'MGP-SAM-ApplePay',
    PaymentData: paymentData,
    IpAddress: '159.180.248.187',
    BrowserInfo: BROWSER_INFO,
  };

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/payins/applepay/direct`;

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
      `ApplePay pay-in failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('ApplePay pay-in response:', data);
  return data;
}
