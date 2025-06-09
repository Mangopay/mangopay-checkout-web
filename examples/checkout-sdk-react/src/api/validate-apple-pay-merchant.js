const { REACT_APP_APPLE_MERCHANT_ID, REACT_APP_BACKEND_API } = process.env;

export const validateApplePayMerchant = async ({ validationURL }) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/get-apple-pay-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        validationURL,
        merchantIdentifier: REACT_APP_APPLE_MERCHANT_ID,
        displayName: 'MyStore',
        initiative: 'web',
        initiativeContext: 'checkout-demo-mangopay.netlify.app',
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const sessionData = await response.json();
    return sessionData;
  } catch (error) {
    console.error('Error validating Apple Pay merchant:', error);

    throw error;
  }
};
