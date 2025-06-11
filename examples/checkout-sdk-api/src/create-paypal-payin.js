import createAccessToken from './create-access-token';
import {
  ADDRESS,
  SECURE_MODE_RETURN_URL as DefaultSecureModeReturnURL,
} from './consts';

const { CLIENT_ID, MANGOPAY_API, USER_ID, WALLET_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID || !WALLET_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, USER_ID, and WALLET_ID must be defined.'
  );
}

export default async function createPayPalPayin(secureModeReturnURL) {
  try {
    const { access_token } = await createAccessToken();

    const payload = {
      Tag: 'Created using the SAM Fastify app',
      AuthorId: USER_ID,
      DebitedFunds: { Currency: 'EUR', Amount: 20000 },
      Fees: { Currency: 'EUR', Amount: 0 },
      CreditedWalletId: WALLET_ID,
      ReturnURL: secureModeReturnURL || DefaultSecureModeReturnURL,
      CancelURL: 'http://www.example.com/',
      StatementDescriptor: 'MGP',
      Shipping: ADDRESS,
      Billing: ADDRESS,
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
      Culture: 'EN',
      ShippingPreference: 'SET_PROVIDED_ADDRESS',
      Reference: 'MGP-SAM-PayPal',
    };

    const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/payins/payment-methods/paypal`;
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
      console.error('PayPal pay-in error response:', errorText);
      throw new Error(
        `PayPal pay-in request failed (status: ${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    console.log('PayPal pay-in response:', data);
    return data;
  } catch (err) {
    console.error('Error in createPayPalPayin:', err);
    throw err;
  }
}
