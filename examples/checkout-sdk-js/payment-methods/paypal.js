const { VITE_BACKEND_API } = import.meta.env;

export const paypalOptions = {
  type: 'paypal',
  options: {
    onCreatePayment: (profilingAttemptReference) => createPayment(profilingAttemptReference),
  },
};

const createPayment = async (profilingAttemptReference) => {
  const response = await fetch(VITE_BACKEND_API + '/create-paypal-payin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profilingAttemptReference,
    }),
  });
  return response.json();
};
