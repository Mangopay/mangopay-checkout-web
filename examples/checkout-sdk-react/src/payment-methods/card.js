const { REACT_APP_BACKEND_API, REACT_APP_SECURE_MODE_RETURN_URL } = process.env;

export const cardOptions = {
  type: 'card',
  options: {
    supportedCardBrands: ['CB', 'VISA', 'MAESTRO', 'MASTERCARD'],
    onCreateCardRegistration: (cardType) => createCardRegistration(cardType),
    onCreatePayment: (data) => createPayment(data),
  },
};

const createCardRegistration = async (cardType) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/create-card-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ CardType: cardType }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating card registration:', error);

    throw error;
  }
};

const createPayment = async (data) => {
  try {
    const { Currency, CardId, profilingAttemptReference, PreferredCardNetwork } = data;
    const response = await fetch(REACT_APP_BACKEND_API + '/create-card-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardId: CardId,
        profilingAttemptReference,
        currency: Currency,
        amount: '2000',
        PreferredCardNetwork,
        SecureModeReturnURL: REACT_APP_SECURE_MODE_RETURN_URL || 'https://checkout.mangopay.com'
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const paymentData = await response.json();
    return paymentData;
  } catch (error) {
    console.error('Error creating payment:', error);

    throw error;
  }
};
