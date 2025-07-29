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

export async function createCardPayIn(
  cardId,
  secureModeReturnURL,
  preferredCardNetwork,
  profilingAttemptReference
) {
  const { access_token } = await createAccessToken();

  const payload = {
    AuthorId: USER_ID,
    CreditedWalletId: WALLET_ID,
    CardId: cardId,
    DebitedFunds: { Currency: 'EUR', Amount: 1500 },
    Fees: { Currency: 'EUR', Amount: 0 },
    SecureModeReturnURL: secureModeReturnURL || DefaultSecureModeReturnURL,
    StatementDescriptor: 'MANGOPAY',
    Billing: ADDRESS,
    Shipping: ADDRESS,
    Tag: 'Mangopay backend example for Checkout SDK.',
    Culture: 'EN',
    IpAddress: '159.180.248.187',
    BrowserInfo: BROWSER_INFO,
    PreferredCardNetwork: preferredCardNetwork,
    ProfilingAttemptReference: profilingAttemptReference,
  };

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/payins/card/direct`;

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
      `Card direct pay-in failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('Card direct pay-in response:', data);
  return data;
}
