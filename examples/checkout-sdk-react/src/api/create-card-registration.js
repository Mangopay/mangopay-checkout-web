const { REACT_APP_BACKEND_API } = process.env;

export const createCardRegistration = async (cardType) => {
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
