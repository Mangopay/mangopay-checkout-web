import createAccessToken from './create-access-token';

const { CLIENT_ID, MANGOPAY_API, USER_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, and USER_ID must be defined.'
  );
}

export default async function getSavedCards() {
  const { access_token } = await createAccessToken();

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/users/${USER_ID}/cards?Active=true`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Get saved cards request failed (status: ${response.status}): ${errorText}`
    );
  }

  const cards = await response.json();
  console.log('Saved cards response:', cards);
  return cards;
}
