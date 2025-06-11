const { CLIENT_ID, API_KEY, MANGOPAY_API } = process.env;
if (!CLIENT_ID || !API_KEY || !MANGOPAY_API) {
  throw new Error(
    'Missing required environment variables: CLIENT_ID, API_KEY, and MANGOPAY_API must be defined.'
  );
}

export async function createAccessToken() {
  const url = `${MANGOPAY_API}/v2.01/oauth/token`;
  const body = new URLSearchParams({ grant_type: 'client_credentials' });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${API_KEY}`).toString(
        'base64'
      )}`,
    },
    body,
  }).catch((err) => {
    console.log(err);
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Access token request failed (status: ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  console.log('Access token response:', data);
  return data;
}
