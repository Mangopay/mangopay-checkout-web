const { REACT_APP_BACKEND_API } = process.env;

export const cardOptions = {
  type: 'card',
  options: {
    supportedCardBrands: ['CB', 'VISA', 'MAESTRO', 'MASTERCARD'],
    onCreateCardRegistration: (cardType) => createCardRegistration(cardType),
    onCreatePayment: (data) => createPayment(data),
  },
};

const createCardRegistration = async (cardType) => {
  const response = await fetch(REACT_APP_BACKEND_API + '/create-card-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      CardType: cardType,
    }),
  });
  return response.json();
};

const createPayment = async (data) => {
  const { Currency, CardId, profilingAttemptReference } = data;
  const response = await fetch(REACT_APP_BACKEND_API + '/create-card-direct-payin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cardId: CardId,
      profilingAttemptReference,
      currency: Currency,
      amount: '2000',
    }),
  });
  return response.json();
};
