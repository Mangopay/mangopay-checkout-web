import createAccessToken from './create-access-token';

const { CLIENT_ID, MANGOPAY_API } = process.env;
if (!CLIENT_ID || !MANGOPAY_API) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID and MANGOPAY_API must be defined.'
  );
}

export default async function deactivateCard(cardId) {
  const { access_token } = await createAccessToken();

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/cards/${cardId}`;
  const payload = { Active: false };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Deactivate card request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('Deactivate card response:', data);
  return data;
}
