const { REACT_APP_BACKEND_API } = process.env;

export const paypalOptions = {
  type: 'paypal',
  options: {
    onCreatePayment: (profilingAttemptReference) => createPayment(profilingAttemptReference),
  },
};

const createPayment = async (profilingAttemptReference) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/create-paypal-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profilingAttemptReference,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment:', error);

    throw error;
  }
};
