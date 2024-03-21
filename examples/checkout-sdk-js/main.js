import './style.css'
import { CheckoutSdk } from '@mangopay/checkout-sdk';
import { cardOptions } from './payment-methods/card';
import { paypalOptions } from './payment-methods/paypal';
import { Toast } from './utils/toast';

const { VITE_PROFILING_MERCHANT_ID, VITE_CLIENT_ID } = import.meta.env;

const options = {
  clientId: VITE_CLIENT_ID,
  profilingMerchantId: VITE_PROFILING_MERCHANT_ID,
  environment: 'SANDBOX',
  amount: {
    value: '20000',
    currency: 'EUR',
  },
  paymentMethods: [cardOptions, paypalOptions],
};

window.addEventListener('load', async () => {
  const mangopaySdk = await CheckoutSdk.loadCheckoutSdk('#container', options);

  if (!mangopaySdk) {
    throw new Error('Failed to load Mangopay CheckoutSdk');
  }

  mangopaySdk.on('tokenizationComplete', (event) => {
    console.log('onTokenizationComplete', event.detail);
    Toast.fire({
      icon: 'success',
      title: 'Tokenization successful'
    });
  });

  mangopaySdk.on('paymentComplete', (event) => {
    console.log('onPaymentComplete', event.detail);
    Toast.fire({
      icon: 'success',
      title: 'Payment successful'
    });
  });

  mangopaySdk.on('error', (event) => {
    console.log('onError', event.detail);
    const {error} = event.detail
    Toast.fire({
      icon: 'error',
      title: error.ResultMessage
    });
  });
});
