import React, { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { MangopayCheckout as MangopayCheckoutComponent } from '@mangopay/checkout-sdk-react';
import { cardOptions as baseCardOptions } from '../payment-methods/card';
import { paypalOptions } from '../payment-methods/paypal';
import { applePayOptions } from '../payment-methods/applepay';
import { googlePayOptions } from '../payment-methods/googlepay';
import { Toast } from '../utils/toast';

const { REACT_APP_PROFILING_MERCHANT_ID, REACT_APP_CLIENT_ID } = process.env;

const MangopayCheckout = ({ savedCards }) => {
  const navigate = useNavigate();
  const sdkRef = useRef(null);

  const checkoutOptions = useMemo(
    () => ({
      clientId: REACT_APP_CLIENT_ID,
      profilingMerchantId: REACT_APP_PROFILING_MERCHANT_ID,
      environment: 'SANDBOX',
      amount: {
        value: '2000',
        currency: 'EUR',
      },
      paymentMethods: [
        {
          type: 'card',
          options: {
            ...baseCardOptions,
            savedCards,
          },
        },
        paypalOptions,
        applePayOptions,
        googlePayOptions,
      ],
    }),
    [savedCards]
  );

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
    console.error('onError', error);
    navigate('/error');
  };

  const onCancel = () => {
    console.log('onCancel');
  };

  return (
    <MangopayCheckoutComponent
      ref={sdkRef}
      options={checkoutOptions}
      onError={onError}
      onCancel={onCancel}
      onTokenizationComplete={onTokenizationComplete}
      onPaymentComplete={onPaymentComplete}
    />
  );
};

export default MangopayCheckout;
