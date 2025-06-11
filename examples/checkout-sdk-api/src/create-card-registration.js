import { createAccessToken } from './create-access-token';

const { CLIENT_ID, MANGOPAY_API, USER_ID } = process.env;
if (!CLIENT_ID || !MANGOPAY_API || !USER_ID) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, MANGOPAY_API, and USER_ID must be defined.'
  );
}

export async function createCardRegistration(cardType) {
  console.log('Requesting card registration for type:', cardType);
  const { access_token } = await createAccessToken();

  const url = `${MANGOPAY_API}/v2.01/${CLIENT_ID}/cardregistrations`;
  const payload = {
    UserId: USER_ID,
    Currency: 'EUR',
    CardType: cardType,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Card registration request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('Card registration response:', data);
  return data;
}
