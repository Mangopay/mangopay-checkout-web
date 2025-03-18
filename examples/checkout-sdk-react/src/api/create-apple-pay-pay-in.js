const { REACT_APP_BACKEND_API } = process.env;

export const createApplePayPayIn = async (payload) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/create-applepay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
