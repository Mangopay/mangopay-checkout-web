const { REACT_APP_BACKEND_API } = process.env;

export const getSavedCards = async () => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/saved-cards', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting saved cards:', error);

    throw error;
  }
};
