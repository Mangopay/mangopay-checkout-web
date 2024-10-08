const { VITE_BACKEND_API, VITE_CLIENT_ID } = import.meta.env;

const createPayment = async (payload) => {
  try {
    const response = await fetch(
      VITE_BACKEND_API + '/create-googlepay-payment',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

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

export const googlePayOptions = {
  type: 'google_pay',
  options: {
    merchantInfo: {
      merchantId: VITE_CLIENT_ID,
      merchantName: VITE_CLIENT_ID,
    },
    gateway: 'whenthen',
    cardParameters: {
      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
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
    onCreatePayment: createPayment,
  },
};
