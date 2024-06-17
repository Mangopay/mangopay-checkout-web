const { VITE_BACKEND_API, VITE_CLIENT_ID } = import.meta.env;

const createGooglePayPayment = async (data) => {
  const response = await fetch(VITE_BACKEND_API + '/create-googlepay-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const googlePayOptions = {
  type: 'google_pay',
  options: {
    merchantInfo: {
      merchantId: VITE_CLIENT_ID || 'test',
      merchantName: VITE_CLIENT_ID || 'test',
    },
    gateway: 'whenthen',
    cardParameters: {
      allowedAuthMethods: ['PAN_ONLY'],
      allowedCardNetworks: ['VISA', 'MASTERCARD'],
    },
    transactionInfo: {
      totalPrice: '20.00',
      totalPriceStatus: 'FINAL',
      currencyCode: 'EUR',
      countryCode: 'DE', // required for EEA only
      transactionId: '123456789',
      totalPriceLabel: '20.00', // required if displayItems is provided
      displayItems: [
        {
          label: 'PS5',
          type: 'SUBTOTAL',
          price: '20.00',
        },
      ],
    },
    paymentData: {
      emailRequired: true,
    },
    onCreatePayment: createGooglePayPayment
  }
};


