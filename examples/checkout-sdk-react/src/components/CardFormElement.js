import { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardFormElement as CardFormElementComponent } from '@mangopay/checkout-sdk-react';

import { cardOptions as baseCardOptions } from '../payment-methods/card';
import { Toast } from '../utils/toast';

const { REACT_APP_PROFILING_MERCHANT_ID, REACT_APP_CLIENT_ID } = process.env;

const CardFormElement = ({ savedCards }) => {
  const navigate = useNavigate();
  const sdkRef = useRef(null);

  const cardFormOptions = useMemo(
    () => ({
      clientId: REACT_APP_CLIENT_ID,
      profilingMerchantId: REACT_APP_PROFILING_MERCHANT_ID,
      environment: 'SANDBOX',
      amount: {
        value: '2000',
        currency: 'EUR',
      },
      paymentMethod: {
        type: 'card',
        options: {
          ...baseCardOptions,
          savedCards,
        },
      },
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
          options={cardFormOptions}
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
