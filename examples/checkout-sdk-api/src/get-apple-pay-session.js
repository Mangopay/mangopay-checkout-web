import https from 'https';

export async function getApplePaySession({
  validationURL,
  initiativeContext,
  merchantIdentifier,
}) {
  const certB64 = process.env.APPLE_PAY_CERT;
  const keyB64 = process.env.APPLE_PAY_KEY;

  if (!certB64 || !keyB64) {
    throw new Error(
      'Missing Apple Pay certificate or key. ' +
        'Add APPLE_PAY_CERT / APPLE_PAY_KEY env vars in Netlify.'
    );
  }

  const cert = Buffer.from(certB64, 'base64');
  const key = Buffer.from(keyB64, 'base64');

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert,
    key,
  });

  const payload = {
    merchantIdentifier,
    displayName: 'Mangopay Store',
    initiative: 'web',
    initiativeContext,
    domain: initiativeContext,
    validationURL,
  };

  const response = await fetch(validationURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    agent: httpsAgent,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Apple Pay session validation failed (status: ${response.status}): ${text}`
    );
  }

  return response.json();
}
