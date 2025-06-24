const { REACT_APP_BACKEND_API, REACT_APP_SECURE_MODE_RETURN_URL } = process.env;

export const createCardDirectPayIn = async (data) => {
  try {
    const { Currency, CardId, ProfilingAttemptReference, SaveCard } = data;
    const response = await fetch(REACT_APP_BACKEND_API + '/create-card-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardId: CardId,
        ProfilingAttemptReference,
        SecureModeReturnURL: REACT_APP_SECURE_MODE_RETURN_URL,
        currency: Currency,
        amount: '2000',
        SaveCard,
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
