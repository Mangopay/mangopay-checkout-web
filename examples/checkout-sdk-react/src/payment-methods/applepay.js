import { validateApplePayMerchant } from '../api/validate-apple-pay-merchant';
import { createApplePayPayIn } from '../api/create-apple-pay-pay-in';

const { REACT_APP_APPLE_MERCHANT_ID } = process.env;

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
    onCreatePayment: createApplePayPayIn,
  },
};
