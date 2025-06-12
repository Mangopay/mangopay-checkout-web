import https from 'https';
import fs from 'fs';

const baseDir = path.dirname(import.meta.url.replace('file://', ''));
const cert = fs.readFileSync(path.join(baseDir, 'certs/merchant_id.pem'));
const key = fs.readFileSync(path.join(baseDir, 'certs/merchant_id.key'));

export async function getApplePaySession({
  validationURL,
  initiativeContext,
  merchantIdentifier,
}) {
  if (!certB64 || !keyB64) {
    throw new Error(
      'Missing Apple Pay certificate or key. ' +
        'Add APPLE_PAY_CERT / APPLE_PAY_KEY env vars in Netlify.'
    );
  }

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
