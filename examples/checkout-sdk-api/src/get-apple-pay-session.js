import fs from 'fs';
import path from 'path';
import https from 'https';

export default async function getApplePaySession(params) {
  const { validationURL, initiativeContext, merchantIdentifier } = params;

  const certPath =
    process.env.APPLE_PAY_CERT_PATH ||
    path.join(__dirname, '..', '.certs', 'merchant_id-sdk-unit-tests.pem');
  const keyPath =
    process.env.APPLE_PAY_KEY_PATH ||
    path.join(__dirname, '..', '.certs', 'merchant_id-sdk-unit-tests.key');

  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);

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

  const data = await response.json();
  console.log('Apple Pay session validated:', data);
  return data;
}
