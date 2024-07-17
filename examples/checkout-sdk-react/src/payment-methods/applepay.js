const { REACT_APP_BACKEND_APPLE_API } = process.env;

const validateApplePayMerchant = async (validationURL) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_APPLE_API + '/get-apple-pay-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        validationURL,
        merchantIdentifier: 'merchant.com.example.mystore',
        displayName: 'MyStore',
        initiative: 'web',
        initiativeContext: 'mystore.example.com',
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
      merchantIdentifier: 'merchant.mangopay.com.payline.58937646344908',
      merchantName: 'Mangopay',
      onValidateMerchant: validateApplePayMerchant,
      requiredBillingContactFields: ['email'],
    },
  },
};
