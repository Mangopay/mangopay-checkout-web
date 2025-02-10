const { REACT_APP_APPLE_MERCHANT_ID, REACT_APP_BACKEND_API } = process.env;

const validateApplePayMerchant = async ({ validationURL }) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/get-apple-pay-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        validationURL,
        merchantIdentifier: REACT_APP_APPLE_MERCHANT_ID,
        displayName: 'MyStore',
        initiative: 'web',
        initiativeContext: 'checkout-demo-mangopay.netlify.app',
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const sessionData = await response.json();
    return sessionData;
  } catch (error) {
    console.error('Error validating Apple Pay merchant:', error);

    throw error;
  }
};

const createPayment = async (payload) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/create-applepay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment:', error);

    throw error;
  }
};

export const applePayOptions = {
  type: 'apple_pay',
  options: {
    paymentRequest: {
      countryCode: 'IE',
      currencyCode: 'EUR',
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard'],
      total: {
        label: 'Demo (Card is not charged)',
        type: 'final',
        amount: '20.00',
      },
      merchantIdentifier: REACT_APP_APPLE_MERCHANT_ID,
      merchantName: 'Mangopay',
      requiredBillingContactFields: ['email'],
      onValidateMerchant: validateApplePayMerchant,
    },
    onCreatePayment: createPayment,
  },
};
