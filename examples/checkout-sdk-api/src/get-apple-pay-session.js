import fs from 'fs';
import path from 'path';
import https from 'https';

const cert = fs.readFileSync(path.join(__dirname, 'certs', 'merchant_id.pem'));
const key = fs.readFileSync(path.join(__dirname, 'certs', 'merchant_id.key'));

export async function getApplePaySession({
  validationURL,
  initiativeContext,
  merchantIdentifier,
}) {
  const httpsAgent = new https.Agent({ cert, key, rejectUnauthorized: false });

  const payload = {
    merchantIdentifier,
    displayName: 'Mangopay Store',
    initiative: 'web',
    initiativeContext,
    domain: initiativeContext,
    validationURL,
  };

  const res = await fetch(validationURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    agent: httpsAgent,
  });

  if (!res.ok) {
    throw new Error(
      `Apple Pay session validation failed (${res.status}): ${await res.text()}`
    );
  }

  return res.json();
}
