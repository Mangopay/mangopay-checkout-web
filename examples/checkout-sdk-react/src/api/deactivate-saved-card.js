const { REACT_APP_BACKEND_API } = process.env;

export const deactivateSavedCard = async ({ cardId }) => {
  try {
    const response = await fetch(REACT_APP_BACKEND_API + '/deactivate-card', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deactivating saved card:', error);

    throw error;
  }
};
