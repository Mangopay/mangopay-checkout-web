import { createPaypalPayIn } from '../api/create-paypal-pay-in';

const { REACT_APP_PAYPAL_MERCHANT_ID } = process.env;

export const paypalOptions = {
  type: 'paypal',
  options: {
    merchantId: REACT_APP_PAYPAL_MERCHANT_ID,
    onCreatePayment: (profilingAttemptReference) => createPaypalPayIn(profilingAttemptReference),
  },
};
