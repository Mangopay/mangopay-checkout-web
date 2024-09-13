import { useRef } from 'react';
import { CardFormElement as CardFormElementComponent } from '@mangopay/checkout-sdk-react';

import { cardOptions } from './payment-methods/card';
import { Toast } from './utils/toast';

const { REACT_APP_PROFILING_MERCHANT_ID, REACT_APP_CLIENT_ID } = process.env;

export const options = {
  clientId: REACT_APP_CLIENT_ID,
  profilingMerchantId: REACT_APP_PROFILING_MERCHANT_ID,
  environment: 'SANDBOX',
  amount: {
    value: '2000',
    currency: 'EUR',
  },
  paymentMethod: cardOptions,
};

const CardFormElement = () => {
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
      Toast.fire({
        icon: 'error',
        title: result.ResultMessage,
      });
    } else {
      Toast.fire({
        icon: 'success',
        title: 'Payment successful',
      });
    }
  };

  const onError = ({ error }) => {
    console.log('onError', error);
    Toast.fire({
      icon: 'error',
      title: error.ResultMessage,
    });
  };

  const handleCompletePayment = () => {
    if (!sdkRef.current) {
      throw new Error('Card Form Element is not loaded.');
    }
    sdkRef.current.completePayment();
  };

  return (
    <>
      <form noValidate>
        <CardFormElementComponent
          ref={sdkRef}
          options={options}
          onError={onError}
          onTokenizationComplete={onTokenizationComplete}
          onPaymentComplete={onPaymentComplete}
        />
      </form>

      <button onClick={handleCompletePayment} className="button">
        Pay now
      </button>
    </>
  );
};

export default CardFormElement;
