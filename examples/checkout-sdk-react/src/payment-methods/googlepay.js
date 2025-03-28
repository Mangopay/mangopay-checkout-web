import { createGooglePayPayIn } from '../api/create-google-pay-pay-in';

const { REACT_APP_CLIENT_ID } = process.env;

export const googlePayOptions = {
  type: 'google_pay',
  options: {
    merchantInfo: {
      merchantId: REACT_APP_CLIENT_ID,
      merchantName: REACT_APP_CLIENT_ID,
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
    onCreatePayment: createGooglePayPayIn,
  },
};
