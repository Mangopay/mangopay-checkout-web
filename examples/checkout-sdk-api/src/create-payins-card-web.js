import { createAccessToken } from './create-access-token';

const { CLIENT_ID, USER_ID, WALLET_ID, MANGOPAY_API } = process.env;
if (!CLIENT_ID || !USER_ID || !WALLET_ID || !MANGOPAY_API) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, USER_ID, WALLET_ID, and MANGOPAY_API must be defined.'
  );
}

export async function createPayinsCardWeb(debitedFunds) {
  const { access_token } = await createAccessToken();

  const payload = {
    AuthorId: USER_ID,
    DebitedFunds: debitedFunds,
    Fees: { Currency: 'EUR', Amount: 0 },
    CreditedWalletId: WALLET_ID,
    ReturnURL: 'https://docs.mangopay.com/',
    CardType: 'CB_VISA_MASTERCARD',
    SecureMode: 'DEFAULT',
    Culture: 'EN',
    Tag: 'Postman create a payin card web',
    StatementDescriptor: 'invoice 1',
  };

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/payins/card/web`;
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
      `Payin request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  const redirectURL = data.RedirectURL;
  if (!redirectURL || typeof redirectURL !== 'string') {
    throw new Error('RedirectURL missing or invalid in payin response');
  }

  console.log('Web card payin redirect URL:', redirectURL);
  return redirectURL;
}
