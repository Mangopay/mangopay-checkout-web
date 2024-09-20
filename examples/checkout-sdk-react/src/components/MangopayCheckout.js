import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { MangopayCheckout as MangopayCheckoutComponent } from '@mangopay/checkout-sdk-react';
import { cardOptions } from '../payment-methods/card';
import { paypalOptions } from '../payment-methods/paypal';
import { applePayOptions } from '../payment-methods/applepay';
import { googlePayOptions } from '../payment-methods/googlepay';
import { Toast } from '../utils/toast';

const { REACT_APP_PROFILING_MERCHANT_ID, REACT_APP_CLIENT_ID } = process.env;

export const options = {
  clientId: REACT_APP_CLIENT_ID,
  profilingMerchantId: REACT_APP_PROFILING_MERCHANT_ID,
  environment: 'SANDBOX',
  amount: {
    value: '2000',
    currency: 'EUR',
  },
  paymentMethods: [cardOptions, paypalOptions, applePayOptions, googlePayOptions],
};

const MangopayCheckout = () => {
  const navigate = useNavigate();
  const sdkRef = useRef(null);

  const onTokenizationComplete = async (result) => {
    console.log('onTokenizationComplete', result);
    Toast.fire({
      icon: 'success',
      title: 'Tokenization successful',
    });
  };

  const onPaymentComplete = async (result) => {
    console.log('onPaymentComplete', result);
    if (result.Status !== 'SUCCEEDED') {
      navigate('/error');
    } else {
      navigate('/success');
    }
  };

  const onError = ({ error }) => {
    console.log('onError', error);
    navigate('/error');
  };

  return (
    <MangopayCheckoutComponent
      ref={sdkRef}
      options={options}
      onError={onError}
      onTokenizationComplete={onTokenizationComplete}
      onPaymentComplete={onPaymentComplete}
    />
  );
};

export default MangopayCheckout;
